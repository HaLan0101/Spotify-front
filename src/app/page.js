"use client";
import { useRouter } from "next/navigation";
import Card from "@/components/Cards/Card";
import HorizontalCard from "@/components/Cards/HorizontalCard";
import Section from "@/components/Section";

import { getLast10Artists, getLast10Albums } from "./api";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
export default function Home() {
  const [lastAlbums, setLastAlbums] = useState([]);
  const [lastArtists, setLastArtists] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const fetchAlbums = () => {
      getLast10Albums()
        .then((data) => {
          setLastAlbums(data);
        })
        .catch((error) => {
          console.error("Error fetching albums :", error);
        });
    };
    const fetchArtists = () => {
      getLast10Artists()
        .then((data) => {
          setLastArtists(data);
        })
        .catch((error) => {
          console.error("Error fetching albums :", error);
        });
    };
    fetchArtists();
    fetchAlbums();
  }, []);

  return (
    <div className="px-5 py-5 bg-gradient-to-b from-pink-950 from-0% to-neutral-900 to-50% rounded-lg">
      <Section label={"Good Morning"} textSize="3xl">
        <div className="grid grid-cols-2 gap-4 w-full">
          <HorizontalCard
            coverSrc={"https://d3ozihag9834pq.cloudfront.net/image/music.png"}
            label={"Liked Songs"}
            bgColor="white"
            borderRadius="l-lg"
            width="100%"
            onClick={() => router.push("/playlist/likedSongs")}
          />
          <HorizontalCard
            coverSrc={"https://d3ozihag9834pq.cloudfront.net/image/music.png"}
            label={"Most listened to"}
            bgColor="white"
            borderRadius="l-lg"
            width="100%"
            onClick={() => router.push("/playlist/topListenedAudios")}
          />
          <HorizontalCard
            coverSrc={"https://d3ozihag9834pq.cloudfront.net/image/music.png"}
            label={"Last listened to"}
            bgColor="white"
            borderRadius="l-lg"
            width="100%"
            onClick={() => router.push("/playlist/lastListenedAudios")}
          />
          <HorizontalCard
            coverSrc={"https://d3ozihag9834pq.cloudfront.net/image/music.png"}
            label={"New Songs"}
            bgColor="white"
            borderRadius="l-lg"
            width="100%"
            onClick={() => router.push("/playlist/newSongs")}
          />
        </div>
      </Section>
      <Section label={"New albums"} textSize="3xl">
        <Carousel responsive={responsive}>
          {lastAlbums.map((item) => (
            <Card
              key={item.id}
              label={item.title}
              greyText={"Album"}
              coverSrc={item.cover}
              onClick={() => router.push(`/album/${item.id}`)}
            />
          ))}
        </Carousel>
      </Section>

      <Section label={"New artists"} textSize="3xl">
        <Carousel responsive={responsive}>
          {lastArtists.map((item) => (
            <Card
              key={item.id}
              label={item.name}
              greyText={"Artist"}
              coverSrc={item.albums[0].cover}
              onClick={() => router.push(`/artist/${item.id}`)}
            />
          ))}
        </Carousel>
      </Section>
    </div>
  );
}
