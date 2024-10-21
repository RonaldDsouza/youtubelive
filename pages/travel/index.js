import React, { useState, useEffect, useRef } from "react";
import youtubeStyles from "../../styles/Youtube.module.css"; // YouTube CSS
import dailymotionStyles from "../../styles/Dailymotion.module.css"; // Dailymotion CSS
import SocialSharing from "../../components/SocialSharing";
import Styles from "@styles/styles.module.css";
import Head from "next/head";
import Script from "next/script";

// export async function getStaticProps() {
//   const res = await fetch("https://youtubelive.vercel.app/travel.json");
//   const articles = await res.json();

//   return {
//     props: {
//       articles: articles.articles,
//     },
//   };
// }

export async function getStaticProps() {
  try {
    // Fetch data from the local JSON file
    const res = await fetch("https://youtubelive.vercel.app/travel.json");

    // Check if the response is OK (status in the range 200-299)
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

    // Return an empty array or some fallback data in case of an error
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

  useEffect(() => {
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

    loadYouTubeAPI();
  }, []);

  useEffect(() => {
    if (playerReady && currentVideoId) {
      // Check if the current video ID is for YouTube
      if (currentVideoId.length === 11) {
        // Assuming YouTube IDs are always 11 characters long
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
      // Clear existing player if any
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

    // Hide the message after 30 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 30000); // 30000 milliseconds = 30 seconds
  };

  const openModal = (videoId) => {
    setCurrentVideoId(videoId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideoId("");

    // Stop YouTube video if it's playing
    if (playerRef.current && playerRef.current.stopVideo) {
      playerRef.current.stopVideo(); // Stop the video for YouTube
    }

    // Clear Dailymotion player
    if (dailymotionPlayerRef.current) {
      dailymotionPlayerRef.current.innerHTML = ""; // Clear the player container
    }
  };

  const travelSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://youtubelive.vercel.app/category/travel/",
        "url": "https://youtubelive.vercel.app/category/travel/",
        "name": "Luxury & Travel Section - Youtube Live™",
        "isPartOf": { "@id": "https://youtubelive.vercel.app/#website" },
        "primaryImageOfPage": { "@id": "https://youtubelive.vercel.app/travel/#primaryimage" },
        "image": { "@id": "https://youtubelive.vercel.app/travel/#primaryimage" },
        "thumbnailUrl": "https://youtubelive.vercel.app/og_image.jpg",
        "breadcrumb": { "@id": "https://youtubelive.vercel.app/travel/#breadcrumb" },
        "inLanguage": "en-US"
      },
      {
        "@type": "ImageObject",
        "inLanguage": "en-US",
        "@id": "https://youtubelive.vercel.app/travel/#primaryimage",
        "url": "https://youtubelive.vercel.app/og_image.jpg",
        "contentUrl": "https://youtubelive.vercel.app/og_image.jpg",
        "width": 1280,
        "height": 720
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://youtubelive.vercel.app/travel/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://youtubelive.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Travel" }
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
        <title>Youtube Live™ - Luxury & Travel Section.</title>

        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://youtubelive.vercel.app/sitemap.xml"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="youtubelive, news, movies, sports, podcast, music, games, shopping, politics, trailers, fashion, education, technology, trending"
        />
        <meta
          name="description"
          content="Discover the best YouTube content in news, movies, sports, podcasts, music, games, and more with Youtube Live™. Explore, stream, and enjoy top-quality videos curated for you."
        />
        <link rel="canonical" href="https://youtubelive.vercel.app/travel" />
        <meta
          name="google-site-verification"
          content="RNN2teFhD-lV1TQ9qcLQiSO5BLBB4DmztyYJS6QLqDg"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Youtube Live™ - Luxury & Travel Section."
        />
        <meta
          property="og:url"
          content="https://youtubelive.vercel.app/travel"
        />
        <meta
          property="og:site_name"
          content="Youtube Live™ - Luxury & Travel Section."
        />
        <meta
          property="og:image"
          content="https://youtubelive.vercel.app/og_image.jpg"
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Youtube Live™ - Luxury & Travel Section."
        />
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
          dangerouslySetInnerHTML={{ __html: travelSchema }}
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
        <h1 className={youtubeStyles.logo}>Luxury & Travel Section.</h1>
      </header>

      <main className={youtubeStyles.main}>
        {/* <div className={Styles.container}> */}
        {articles.length > 0 ? (
          <div className={youtubeStyles.grid}>
            {articles.map((article) => (
              <div key={article.id} className={youtubeStyles.card}>
                {article.image && (
                  <div
                    className={youtubeStyles.imageWrapper}
                    onClick={() => openModal(article.videoitem[0])}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{
                        width: "100%", // Ensures the image is displayed at this width
                        height: "200px", // Ensures the image is displayed at this height
                        objectFit: "fill", // Ensures the image covers the dimensions
                        margin: "auto",
                        fontWeight: "bold",
                        textAlign: "center",
                        cursor: "pointer",
                        boxShadow: "0 0 10px 0 #000", // Shadow effect
                        filter:
                          "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)", // Image filter effects
                      }}
                    />
                  </div>
                )}
                <div
                  className={youtubeStyles.title}
                  style={{
                    margin: "auto",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "center",
                    cursor: "pointer",
                    textShadow: "1px 1px 0px #000",
                  }}
                >
                  {article.title}
                </div>
                <div className={youtubeStyles.channel}>{article.channel}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos available.</p>
        )}
        <p
          className="flex flex-col items-center justify-center"
          style={{
            color: "red",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          This content is made available under the Fair Use Act for educational
          and commentary purposes only. No copyright infringement is intended.
        </p>
      </main>

      {isModalOpen && (
        <div className={youtubeStyles.modal}>
          <div className={youtubeStyles.modalContent}>
            <button className={youtubeStyles.close} onClick={closeModal}>
              Close
            </button>
            {showMessage && (
              <div
                className={dailymotionStyles.message}
                className="shadow-lg flex items-center justify-center text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl"
              >
                If Required ! Password is 12345. <br />
                <br />
                This Message will disappear after 30 seconds.
              </div>
            )}
            {currentVideoId.length === 11 ? ( // Assuming YouTube IDs are always 11 characters
              <div
                id="youtube-player"
                className={youtubeStyles.player}
                style={{
                  filter:
                    "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
                }}
              ></div>
            ) : (
              <div
                ref={dailymotionPlayerRef}
                className={youtubeStyles.player}
                style={{
                  filter:
                    "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
                }}
              ></div>
            )}
          </div>
        </div>
      )}

      {/* </div> */}
    </>
  );
}
