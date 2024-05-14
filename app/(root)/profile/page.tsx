import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventById, getEventByUser } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Profile = async ({searchParams}: SearchParamProps) => {

    const { sessionClaims } = auth()
    const userId = sessionClaims?.sub as string;

    
    const eventPage = Number(searchParams?.eventsPage) || 1

    const organizedEvents = await getEventByUser({userId, page:eventPage})


  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size={"lg"} className="button hidden sm:flex">
            <Link href={"/#events"}>Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext='"No worries - plenty of exciting events to explore!"'
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamsName="OrderPage"
          totalPages={1}
        />
      </section>


      {/* Event Organize */}

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Events</h3>
          <Button asChild size={"lg"} className="button hidden sm:flex">
            <Link href={"/#events"}>Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
         <Collection data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={1}
          totalPages={1}/>
      </section>
    </>
  );
};

export default Profile;
