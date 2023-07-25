"use client";
import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import NewMeetupForm from '@/app/components/meetups/NewMeetupForm';

export default function Page() {
  const router = useRouter();

  const addMeetupHandler = async() => {
    const response = await fetch('/api/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities.'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
