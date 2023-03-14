use anchor_lang::prelude::*;
use borsh::{BorshDeserialize, BorshSerialize};

#[constant]
pub const MINAMOUNT: u64 = 10_000_000_000_000_000_000; //0.01 SOL

#[constant]
pub const USER_TAG: &[u8] = b"user";

#[constant]
pub const AUCTION_TAG: &[u8] = b"auction";

#[constant]
pub const BID_TAG: &[u8] = b"bid";

declare_id!("Hpx2mNudLzybJvBChkDq31oSfzvQFEsJGQFHGAKUggkc");

#[program]
pub mod grizzlython {
    use super::*;
    pub fn create_user(ctx: Context<CreateUser>, name: String, is_community: bool) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.pubkey = ctx.accounts.user.key();
        user.name = name;
        user.is_community = is_community;
        Ok(())
    }

    pub fn create_auction(
        ctx: Context<CreateAuction>,
        deadline: u64,
        min_bid_amount: u64,
    ) -> Result<()> {
        let user = &mut ctx.accounts.user;
        if user.is_community {
            let auction = &mut ctx.accounts.auction;
            auction.is_active = true;
            auction.community = *ctx.accounts.user.to_account_info().key;
            auction.deadline = deadline;
            auction.bids = *ctx.accounts.bids.to_vec();
            auction.min_bid_amount = min_bid_amount;
        }
        Ok(())
    }

    pub fn bid(ctx: Context<MakeBid>, bid_amount: u64, now: u64) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let user = &mut ctx.accounts.user;
        if ((MINAMOUNT < bid_amount)
            && (bid_amount > auction.min_bid_amount)
            && (auction.is_active)
            && (auction.deadline >= now))
        {
            let bid = &mut ctx.accounts.bid;
            bid.bidder = user.pubkey;
            bid.bid_amount = bid_amount;
            bid.min_bid_amount = MINAMOUNT;
            bid.bid_time = now;
            bid.is_selected = false;
            auction.min_bid_amount = bid_amount;
            auction.bids.push(bid);
        }
        Ok(())
    }

    pub fn close_auction(ctx: Context<CloseAuction>, chosen: Pubkey) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let user = &mut ctx.accounts.user;
        let bid = &mut ctx.accounts.bid;

        for bid in auction.bids.bid.bidder.into_iter() {
            match bid {
                chosen => {
                    bid.is_selected = true;
                    auction.is_active = false;
                    //transfer(bid.bidder, auction.community.pubkey, lamports) //TODO
                }
                _ => Err("No one selected!"),
            }
        }
        Ok(())
    }
}

//Accounts
#[derive(Accounts, BorshSerialize, BorshDeserialize)]
#[instruction()]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
    init,
    payer = owner,
    space = User::size(),
    seeds = ["USER_TAG", owner.key().as_ref()],
    bump
    )]
    pub user: Box<Account<'info, User>>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts, BorshSerialize, BorshDeserialize)]
#[instruction()]
pub struct CreateAuction<'info> {
    #[account(
    mut,
    seeds = ["USER_TAG", owner.key().as_ref()],
    bump,
    )]
    pub user: Box<Account<'info, User>>,

    #[account(
    init,
    payer = owner,
    has_one = owner,
    seeds = ["AUCTION_TAG", owner.key().as_ref()],
    bump,
    space = Auction::size(),
    )]
    pub auction: Box<Account<'info, Auction>>,

    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts, BorshSerialize, BorshDeserialize)]
pub struct MakeBid<'info> {
    #[account(
    mut,
    seeds = ["USER_TAG", owner.key().as_ref()],
    bump)]
    pub user: Box<Account<'info, User>>,
    #[account(
    mut,
    seeds = ["AUCTION_TAG", owner.key().as_ref()],
    bump,
    has_one = owner
    )]
    pub auction: Box<Account<'info, Auction>>,
    #[account(
    mut,
    has_one = owner
    )]
    pub bid: Account<'info, Bid>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts, BorshSerialize, BorshDeserialize)]
pub struct CloseAuction<'info> {
    #[account(
    mut,
    seeds = [USER_TAG, owner.key().as_ref()],
    bump,
    has_one = owner)]
    pub community: Box<Account<'info, User>>,

    #[account(
    mut,
    seeds = [AUCTION_TAG, owner.key().as_ref()],
    bump)]
    pub auction: Box<Account<'info, Auction>>,

    #[account(
    mut,
    seeds = [BID_TAG, owner.key().as_ref()],
    bump)]
    pub winner: Box<Account<'info, Bid>>,

    #[account(signer)]
    pub owner: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

//Account
#[account]
#[derive(Default)]
pub struct User {
    pub pubkey: Pubkey,     //32
    pub is_community: bool, //2
    pub name: String,       //32
}

impl User {
    fn size() -> u32 {
        return 32 + 2 + 32;
    }
}

#[account]
#[derive(Default)]
pub struct Auction {
    is_active: bool,          //2
    community: User,          //64
    deadline: u64,            //64 //Todo
    bids: Vec<(Pubkey, u64)>, //256*15
    min_bid_amount: u64,      //64
}

impl Auction {
    fn size() -> u32 {
        return 2 + 64 + 64 + (256 * 15) + 64;
    }
}

#[account]
#[derive(Default)]
pub struct Bid {
    bidder: Pubkey,      //32
    bid_amount: u64,     //64
    min_bid_amount: u64, //64
    bid_time: u64,       //64
    is_selected: bool,   //2
}

impl Bid {
    fn size() -> u32 {
        return 32 + 64 + 64 + 64 + 2;
    }
}
