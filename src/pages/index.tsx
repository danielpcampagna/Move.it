import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';


import Navbar from '../components/Navbar';
import { useSession, getSession } from 'next-auth/client'
import Login from '../components/Login';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home(props: HomeProps) {

  const [ session, loading ] = useSession()

  return (
    <>
      { !session ? (
        <Login></Login>
      ) : (
        <ChallengesProvider
          level={props.level}
          currentExperience={props.currentExperience}
          challengesCompleted={props.challengesCompleted}
        >
          <Navbar>
            {/* <div className={styles.homeContainer}> */}
              <div className={styles.container}>
                <Head>
                  <title>Início | move.it</title>
                </Head>
                  <ExperienceBar></ExperienceBar>

                  <CountdownProvider>
                    <section>
                      <div>
                        <Profile />
                        <CompletedChallenges />
                        <Countdown />
                      </div>
                      <div>
                        <ChallengeBox/>
                      </div>
                    </section>
                  </CountdownProvider>
              </div>
          </Navbar>
        </ChallengesProvider>
      )}
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      session: await getSession(ctx)
    }
  }
}