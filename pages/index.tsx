import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { toast } from "react-toastify";
import Head from "next/head";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

import "react-toastify/dist/ReactToastify.css";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Home: NextPage = () => {
  const notify = () =>
    toast(" Welcome to Our University Communities Funding platform!🦄");

  const communitiesPage=()=>{
    window.location.href = "/communities";
  }

  const companiesPage=()=>{
    window.location.href = "/companies";
  }

  return (
    <>
      <Head>
        <title>UNITRUST</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <div className={styles.container}>
        <div className="border-[2px] rounded-2xl bg-inherit p-[1.25rem]">
          <div className="flex flex-col justify-center px-4 bg-inherit gap-4">
            
            <h1 className={styles.h1}>Hello everyone & Welcome to UniTrust Platfrom 👋</h1>
            <p className={styles.explain}>
            University Commmunites Funding using <b>Solana</b> Blockchain<br/>
            Welcome to Our University Communities Funding platform! We are excited to bring together 
            companies and Communities and Communities in support of eductaion, innovation, and events. 
            With the power of Solana Blockchain technology, we are able to facilitate secure and transparent
            transactions, ensuring that your contributions go directly towards supporting 
            the development of our univerisity's programs and initatives.<br/><br/>
            <b>Thank you for joining us in our mission to create a brighter future 
            for our students and communities.</b>
              
            </p>
            <div className="flex flex-col md:flex-row gap-3 justify-around  items-center py-8">
              <button onClick={notify} className="btn glow-on-hover">
                Notify!
              </button>
              <button onClick={communitiesPage} className="btn glow-on-hover">
                All communities
              </button>
              <button onClick={companiesPage} className="btn glow-on-hover">
                All companies
              </button>
              <WalletMultiButtonDynamic className="btn glow" />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-center items-center gap-4">
          <h1 className={styles.h1}>How it works</h1>
          <div className="flex flex-col md:flex-row gap-4 justify-around  items-center ">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="rounded-[10px] border-[2px] p-3">                
                <p className={styles.explain}>
                Our platform allows both companies and communities to support university programs, initiatives, and events through secure and transparent transactions using Solana's blockchain technology. <br/><br/>
                Companies can browse and support university events such as career fairs, conferences, and cultural celebrations. <br/><br/>
                Communities can browse and support university programs, initiatives, and events, or even create their own projects and initiatives with the support of the university community. <br/><br/>
                All contributions are directly deposited into the university's account and can be used to cover costs associated with organizing and hosting the events, or support the development of the programs and initiatives. <br/><br/>
                Contributors can track the progress of their supported programs, initiatives, and events, and receive updates from the university community. <br/><br/>
                By supporting university programs, initiatives, and events, both companies and communities can help build stronger relationships with the university community and support the development of future leaders and innovators.
                </p>
                </div>
                <img
                src="/communities.png"
                height={900}
                width={900}
                style={{
                  objectFit: "contain",
                }}
                alt="unitrust"
              />
            </div>
          </div>
      </div>
    </div>
    </>
  );
};

export default Home;