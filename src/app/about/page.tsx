import Image from "next/image";
import profilePic from "@/assets/profile-picture.jpg";

export default function AboutPage() {
  return (
    <div>
      <section className="flex space-x-4 p-24">
        <Image
          width={100}
          height={100}
          alt="dimitar photo"
          src={profilePic}
          className="rounded-lg w-32 h-32"
        />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">My name is Dimitar Dimitrov</h1>
          <p className="">
            I&apos;sm currently an Engineer Student in Business Intelligence
            working in a Big Telecom company as a Data Analyst, while building
            my Design & Development Agency{" "}
            <a href="https://www.amystlabs.com">Amyst Labs</a>.
          </p>
          <p>
            I built this website to share my photos for now, since photography
            is a hobby of mine. Maybe I will share more things later on, like my
            toughts in a blog format or some of my projects.
          </p>
          <p>Enough talking about me, here are the photos.</p>
        </div>
      </section>
    </div>
  );
}
