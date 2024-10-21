import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styles from "@styles/styles.module.css";

export default function HomePage() {
  const uwatchfreeSchema = JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Youtube Live™ - Online. Stream. Discover.",
      url: "https://youtubelive.vercel.app/",
      image: ["https://youtubelive.vercel.app/favicon.ico"],
      logo: {
        "@type": "ImageObject",
        url: "https://youtubelive.vercel.app/logo.png",
        width: 280,
        height: 80,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://youtubelive.vercel.app/",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://youtubelive.vercel.app/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ]);

  const rankMathSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://gravatar.com/drtrailer2022",
        name: "Dr Trailer",
        url: "https://gravatar.com/drtrailer2022",
        image: {
          "@type": "ImageObject",
          "@id": "https://gravatar.com/drtrailer2022",
          url: "https://gravatar.com/drtrailer2022",
          caption: "Dr Trailer",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://youtubelive.vercel.app/#organization",
        name: "Youtube Live™ - Online. Stream. Discover.",
        url: "https://youtubelive.vercel.app",
      },
      {
        "@type": "WebSite",
        "@id": "https://youtubelive.vercel.app/#website",
        url: "https://youtubelive.vercel.app",
        name: "Youtube Live™ - Online. Stream. Discover.",
        publisher: {
          "@type": "Organization",
          "@id": "https://youtubelive.vercel.app/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://youtubelive.vercel.app/#webpage",
        url: "https://youtubelive.vercel.app/",
        name: "Movie",
        datePublished: "2024-01-13T13:00:00+00:00",
        dateModified: "2024-01-13T13:13:00+00:00",
        isPartOf: {
          "@id": "https://youtubelive.vercel.app/#website",
        },
        inLanguage: "en-US",
      },
    ],
  });

  return (
    <>
      <Head>
        <title>Youtube Live™ - Online. Stream. Discover.</title>

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
        <link rel="canonical" href="https://youtubelive.vercel.app/" />
        <meta
          name="google-site-verification"
          content="RNN2teFhD-lV1TQ9qcLQiSO5BLBB4DmztyYJS6QLqDg"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Youtube Live™ - Online. Stream. Discover."
        />
        <meta property="og:url" content="https://youtubelive.vercel.app" />
        <meta
          property="og:site_name"
          content="Youtube Live™ - Online. Stream. Discover."
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
          content="Youtube Live™ - Online. Stream. Discover."
        />
        <meta
          name="twitter:description"
          content="Discover the best YouTube content in news, movies, sports, podcasts, music, games, and more with Youtube Live™. Explore, stream, and enjoy top-quality videos curated for you."
        />
        <meta
          name="twitter:image"
          content="https://youtubelive.vercel.app/og_image.jpg"
        />
        <meta name="google-adsense-account" content="ca-pub-4821855388989115" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: uwatchfreeSchema }}
        />
          <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4821855388989115"
          crossOrigin="anonymous"
        ></script>
      </Head>
      {/* <div className='container'> */}
      <div className={styles.title}>
        <div className="content">
          <h1 className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2">
            YoutubeLive™ - Online. Stream. Discover.
          </h1>

          <h2
            className="highlight"
            className={styles.title}
            className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-2xl hover:text-blue-800 font-bold mt-2"
          >
            Discover the Live Stream on Youtube Live™
          </h2>
          <p
            className="description"
            className={styles.description}
            className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-bg hover:text-blue-800 font-bold mt-2"
          >
            {/* Welcome to <strong> Youtube Live™,</strong> your ultimate destination for discovering the best content from YouTube, all in one place! We handpick and analyze top-quality videos across various sectors like news, movies, sports, podcasts, music, games, shopping, politics, trailers, fashion, education, technology, and trending topics. Our goal is to provide our viewers with an enriched experience, offering only the most engaging and relevant content available on YouTube. Whether you're looking to stay informed, entertained, or inspired, Youtube Live™ curates the ultimate selection for you to explore and enjoy effortlessly. */}
            Welcome to <strong>Youtube Live™,</strong> your go-to platform for
            discovering the best YouTube content curated just for you. We
            specialize in presenting the ultimate selection of videos across a
            wide range of categories including{" "}
            <strong>
              {" "}
              news, movies, sports, podcasts, music, games, shopping, politics,
              trailers, fashion, education, technology, and the latest trending
              topics.{" "}
            </strong>{" "}
            By analyzing thousands of videos, we ensure that only the
            highest-quality, most engaging, and relevant content makes it to our
            platform. Whether you're a fan of current events, a movie buff, a
            tech enthusiast, or someone who loves to stay on top of trends,
            we’ve got you covered.
          </p>
          <p
            className="description"
            className={styles.description}
            className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-bg hover:text-blue-800 font-bold mt-2"
          >
            At Youtube Live™, we believe in simplifying your content discovery
            journey. Instead of spending hours sifting through endless videos,
            we provide a streamlined experience that offers the best of what
            YouTube has to offer—all in one place. Our advanced algorithms and
            expert team sort through vast amounts of content, selecting videos
            that cater to your interests and are tailored for maximum
            engagement. Whether you want to watch breaking news, the latest
            movie trailers, or the hottest new fashion trends, our platform
            delivers it all.
          </p>
          <p
            className="description"
            className={styles.description}
            className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-bg hover:text-blue-800 font-bold mt-2"
          >
            Designed with our viewers in mind, Youtube Live™ makes it easy for
            you to explore, discover, and enjoy content. We are committed to
            creating a space where you can dive deep into any topic, explore new
            interests, and keep up with the latest and greatest from around the
            world—all through YouTube’s vast library of videos. Start exploring
            today and uncover the ultimate viewing experience!
          </p>

          <section>
            {/* Add your Fair Use Notice */}
            <p
              style={{
                color: "red",
                fontSize: "18px",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              This content is made available under the Fair Use Act for
              educational and commentary purposes only. No copyright
              infringement is intended.
            </p>
          </section>
          <Link href="/live">
            <div className="cta-button">Enter Youtube Live™</div>
          </Link>
        </div>
      </div>
      {/* </div> */}

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 0 20px;
          background: #000;
          font-family: "Poppins", sans-serif;
        }

        .content {
          text-align: center;
          width: 100%;
          color: #fff;
          padding: 20px;
        }

        .title {
          font-size: 1.25rem;
          font-weight: 900;
          margin-bottom: 1rem;
          text-transform: uppercase;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .highlight {
          font-size: 1.5rem;
          background: black;
          background-clip: text;
          color: transparent;
          font-weight: bold;
          margin-top: 1rem;
        }

        .description {
          font-size: 1rem;
          background: black;
          background-clip: text;
          color: transparent;
          margin-top: 1rem;
        }

        .telegram-link {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          background: black;
          background-clip: text;
          color: transparent;
          margin-top: 25px;
        }

        .telegram-icon {
          color: #0088cc;
          margin-left: 10px;
          font-size: 2rem;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .subtitle {
          font-size: 0.875rem;
          margin-top: 1rem;
          background: linear-gradient(to right, #ff7e5f, #feb47b);
          background-clip: text;
          color: transparent;
        }

        .cta-button {
          display: inline-block;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          font-weight: 600;
          color: #ff7e5f;
          background-color: #fff;
          border-radius: 50px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
          text-transform: uppercase;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .cta-button:hover {
          background-color: #ff6f61;
          color: #fff;
          box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
          transform: translateY(-3px);
        }

        @media (min-width: 768px) {
          .title {
            font-size: 2rem;
          }

          .highlight {
            font-size: 2rem;
          }

          .telegram-link {
            font-size: 2rem;
          }

          .cta-button {
            font-size: 1.125rem;
          }
        }

        @media (min-width: 1024px) {
          .title {
            font-size: 2.5rem;
          }

          .highlight {
            font-size: 2.5rem;
          }

          .telegram-link {
            font-size: 2.5rem;
          }

          .cta-button {
            font-size: 1.25rem;
            padding: 1rem 2rem;
          }
        }
      `}</style>
    </>
  );
}
