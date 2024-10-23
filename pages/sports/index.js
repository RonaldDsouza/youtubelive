import React, { useState, useEffect, useRef } from "react";
import youtubeStyles from "../../styles/Youtube.module.css"; // YouTube CSS
import dailymotionStyles from "../../styles/Dailymotion.module.css"; // Dailymotion CSS
import SocialSharing from "../../components/SocialSharing";
import Styles from "@styles/styles.module.css";
import Head from "next/head";
import Script from "next/script";

export async function getStaticProps() {
  try {
    const res = await fetch("https://youtubelive.vercel.app/sports.json");
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const articles = await res.json();

    return {
      props: {
        articles: articles.articles, // Ensure this matches your JSON structure
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
}

export default function HomePage({ articles }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const dailymotionPlayerRef = useRef(null); // Reference for Dailymotion player
  const [showMessage, setShowMessage] = useState(false); // State for the message visibility

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of articles per page

  // Calculate displayed articles based on pagination
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const loadYouTubeAPI = () => {
    const onYouTubeIframeAPIReady = () => setPlayerReady(true);
    if (typeof window !== "undefined" && typeof YT === "undefined") {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }
  };

  useEffect(() => {
    loadYouTubeAPI();
  }, []);

  useEffect(() => {
    if (playerReady && currentVideoId) {
      if (currentVideoId.length === 11) {
        playerRef.current = new window.YT.Player("youtube-player", {
          width: "100%",
          height: "100%",
          videoId: currentVideoId,
          playerVars: {
            autoplay: 1,
            mute: 0,
            enablejsapi: 1,
            modestbranding: 1,
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
              setShowMessage(true); // Show message when the player is ready
            },
          },
        });
      } else {
        loadDailymotionPlayer(currentVideoId);
      }
    }
  }, [playerReady, currentVideoId]);

  const loadDailymotionPlayer = (videoId) => {
    if (dailymotionPlayerRef.current) {
      dailymotionPlayerRef.current.innerHTML = ""; // Clear previous player
    }

    const player = document.createElement("iframe");
    player.src = `https://www.dailymotion.com/embed/video/${videoId}`;
    player.width = "100%";
    player.height = "100%";
    player.setAttribute("allowfullscreen", "true");
    player.setAttribute("frameborder", "0");
    player.setAttribute("allow", "autoplay");

    dailymotionPlayerRef.current.appendChild(player); // Append new player
    setShowMessage(true); // Show message when the player loads
  };

  const openModal = (videoId) => {
    setCurrentVideoId(videoId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideoId("");

    if (playerRef.current && playerRef.current.stopVideo) {
      playerRef.current.stopVideo(); // Stop the video for YouTube
    }

    if (dailymotionPlayerRef.current) {
      dailymotionPlayerRef.current.innerHTML = ""; // Clear the player container
      setShowMessage(false); // Hide message when closing modal
    }
  };

  const buttonStyle = {
    backgroundColor: "#0070f3", // Button color
    color: "white", // Text color
    border: "none", // Remove border
    borderRadius: "5px", // Rounded corners
    padding: "10px 15px", // Padding
    cursor: "pointer", // Pointer cursor on hover
    transition: "background-color 0.3s", // Smooth transition
    margin: "0 5px", // Margin for buttons
  };



  const sportsSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://youtubelive.vercel.app/category/sports/",
        "url": "https://youtubelive.vercel.app/category/sports/",
        "name": "Sports Section - Youtube Live™",
        "isPartOf": { "@id": "https://youtubelive.vercel.app/#website" },
        "primaryImageOfPage": { "@id": "https://youtubelive.vercel.app/sports/#primaryimage" },
        "image": { "@id": "https://youtubelive.vercel.app/sports/#primaryimage" },
        "thumbnailUrl": "https://youtubelive.vercel.app/og_image.jpg",
        "breadcrumb": { "@id": "https://youtubelive.vercel.app/sports/#breadcrumb" },
        "inLanguage": "en-US"
      },
      {
        "@type": "ImageObject",
        "inLanguage": "en-US",
        "@id": "https://youtubelive.vercel.app/sports/#primaryimage",
        "url": "https://youtubelive.vercel.app/og_image.jpg",
        "contentUrl": "https://youtubelive.vercel.app/og_image.jpg",
        "width": 1280,
        "height": 720
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://youtubelive.vercel.app/sports/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://youtubelive.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Sports" }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://youtubelive.vercel.app/#website",
        "url": "https://youtubelive.vercel.app/",
        "name": "Youtube Live™",
        "description": "",
        "publisher": { "@id": "https://youtubelive.vercel.app/#organization" },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": { "@type": "EntryPoint", "urlTemplate": "https://youtubelive.vercel.app/?s={search_term_string}" },
            "query-input": {
              "@type": "PropertyValueSpecification",
              "valueRequired": true,
              "valueName": "search_term_string"
            }
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://youtubelive.vercel.app/#organization",
        "name": "Youtube Live™",
        "url": "https://youtubelive.vercel.app/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://youtubelive.vercel.app/#/schema/logo/image/",
          "url": "https://youtubelive.vercel.app/logo.png",
          "contentUrl": "https://youtubelive.vercel.app/logo.png",
          "width": 280,
          "height": 100,
          "caption": "Youtube Live™"
        },
        "image": { "@id": "https://youtubelive.vercel.app/#/schema/logo/image/" }
      }
    ]
  });

  return (
    <>
      <Head>
        <title>Youtube Live™ - Sports Section.</title>

        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://youtubelive.vercel.app/sitemap.xml"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta
          name="keywords"
          content="youtubelive, news, movies, sports, podcast, music, games, shopping, politics, trailers, fashion, education, technology, trending"
        />
        <meta
          name="description"
          content="Discover the best YouTube content in news, movies, sports, podcasts, music, games, and more with Youtube Live™. Explore, stream, and enjoy top-quality videos curated for you."
        />
        <link rel="canonical" href="https://youtubelive.vercel.app/sports" />
        <meta
          name="google-site-verification"
          content="RNN2teFhD-lV1TQ9qcLQiSO5BLBB4DmztyYJS6QLqDg"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Youtube Live™ - Sports Section." />
        <meta
          property="og:url"
          content="https://youtubelive.vercel.app/sports"
        />
        <meta
          property="og:site_name"
          content="Youtube Live™ - Sports Section."
        />
        <meta
          property="og:image"
          content="https://youtubelive.vercel.app/og_image.jpg"
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Youtube Live™ - Sports Section." />
        <meta
          name="twitter:description"
          content="Discover the best YouTube content in news, movies, sports, podcasts, music, games, and more with Youtube Live™. Explore, stream, and enjoy top-quality videos curated for you."
        />
        <meta
          name="twitter:image"
          content="https://youtubelive.vercel.app/og_image.jpg"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sportsSchema }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4821855388989115"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <SocialSharing />
      <Script src="../../propler/ads.js" defer />
      <Script src="../../propler/ads2.js" defer />
      <div
        className="shadow-lg flex items-center justify-center"
        role="navigation"
      >
        <ul
          id="menu-header-menu"
          className="menu flex flex-wrap justify-center"
        >
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-248" className="menu-operating-systems">
              <a
                href="../live/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Live News<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-248" className="menu-operating-systems">
              <a
                href="../movies/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Movies<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-11605" className="menu-3dcad">
              <a
                href="../sports/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Sports<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-11610" className="menu-graphicdesign">
              <a
                href="../music/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Music<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-196" className="menu-multimedia">
              <a
                href="../games/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Games<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-161" className="menu-development">
              <a
                href="../shopping/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Shopping<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-161" className="menu-development">
              <a
                href="../travel/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Travel<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-35" className="menu-home active">
              <a
                href="../politics/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Politics<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-84" className="menu-antivirus">
              <a
                href="../podcast/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Podcast<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-84" className="menu-antivirus">
              <a
                href="../trailers/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Trailers<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-11606" className="menu-security">
              <a
                href="../fashion/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Fashion<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-35" className="menu-home active">
              <a
                href="../education/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Education<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-35" className="menu-home active">
              <a
                href="../technology/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Technology<span className="p"></span>
              </a>
            </li>
          </button>
          <button className="border border-black p-2 m-1 hover:bg-orange-100">
            <li id="menu-item-194" className="menu-tutorials">
              <a
                href="../latest/"
                className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                Trending <span className="p"></span>
              </a>
            </li>
          </button>
        </ul>
      </div>

      {/* <div className={youtubeStyles.container} > */}
      <header className={youtubeStyles.header}>
        <h1 className={youtubeStyles.logo}>
          Sports Live & Highlights Section.
        </h1>
      </header>

      <div className="shadow-lg flex items-center justify-center" role="navigation">
        <ul id="menu-header-menu" className="menu flex flex-wrap justify-center">
          {/* Add your buttons for categories or other sections here */}
        </ul>
      </div>

      <div className="container mx-auto py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentArticles.map((article, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p>{article.description}</p>
              <button
                style={buttonStyle}
                onClick={() => openModal(article.videoId)}
              >
                Watch Now
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal for video */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-5 rounded-lg relative w-full max-w-4xl mx-auto">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            {currentVideoId.length === 11 ? (
              <div id="youtube-player" className={youtubeStyles.videoWrapper} />
            ) : (
              <div ref={dailymotionPlayerRef} className={dailymotionStyles.videoWrapper} />
            )}
          </div>
        </div>
      )}

      {showMessage && <div className={Styles.message}>Enjoy your video!</div>}
    </>
  );
}