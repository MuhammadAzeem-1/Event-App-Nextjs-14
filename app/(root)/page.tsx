import Search from "@/components/shared/Search";
import Categories from "@/components/shared/Categories"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function Home() {

  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6
  })

  


  return (
  <>
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-6 md:py-10">

      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
         <div className="flex flex-col justify-center gap-8">
             <h1 className="h1-bold">Host,Connect, Celebrate: Your Events, Our Platform</h1>
             <p className="p-regular-20 md:p-regular-24">Book Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, deleniti!</p>
             <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href={"#events"}>
                Explore Now
              </Link>
              </Button>     
          </div>   

          <Image src={"/assets/images/hero.png"} alt="hero" width={1000} height={1000} className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"/>
      </div>  
    </section>    

    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Trust by <br /> Thousand of Events</h2>

      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Search />
        <Categories />
      </div>

      <Collection data={events?.data} page={1} limit={6} emptyTitle="No Event Foubd" emptyStateSubtext="Come Back Later" totalPages= {events?.totalPages} collectionType="All_Events"/>
    </section>
  </>
  );
}
