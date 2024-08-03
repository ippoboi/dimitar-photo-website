import Image from "next/image";
import profilePic from "../../assets/profile-picture.jpg";
import { galleryData } from "../../data/gallery";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col space-y-20">
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

      <section className="space-y-4 p-2">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {galleryData.map((item, index) => (
            <Image
              alt={item.alt}
              src={item.src}
              key={index}
              className="rounded-lg"
            />
          ))}
          <button className="flex justify-center items-center rounded-lg border border-dashed border-gray-500 gap-2 hover:bg-gray-950 transition-colors duration-200">
            <svg
              data-testid="geist-icon"
              height="16"
              stroke-linejoin="round"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z"
                fill="currentColor"
              ></path>
            </svg>
            <p className="text-gray-500 text-center">Add photo</p>
          </button>
        </div>
      </section>
    </main>
  );
}
