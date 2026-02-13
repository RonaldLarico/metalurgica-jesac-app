import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/es";
import ShareButtons from "../common/ShareButtons";
import type { BlogCardProps } from "./type";
import CommentsSection from "./CommentsSection";
import { BlogReactions } from "./BlogReaction";
import QuestionList from "./QuestionList";

const BlogCard: React.FC<BlogCardProps> = ({ blog, userId }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = blog.service.images || [];
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <article className="max-w-7xl mx-auto p-3 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
      <div className="flex justify-between items-center mb-2">
        {blog.service.category && (
          <span className="inline-block mb-2 rounded-xl bg-[#057ec4]/15 dark:bg-[#38bdf8]/20 px-3 py-1 text-[13px] font-semibold tracking-[0.3em] uppercase text-[#057ec4] dark:text-[#38bdf8]">
            {blog.service.category}
          </span>
        )}
        <h2 className="inline-block mb-2 rounded-xl bg-violet-500/25 dark:bg-indigo-900 px-3 py-1 text-[13px] font-semibold tracking-[0.3em] uppercase text-violet-600 dark:text-violet-300">
          Servicio
        </h2>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-(--color-primary) dark:text-(--color-secondary) mb-4">
        {blog.service.title}
      </h1>
      <p className="text-sm mb-6 text-violet-600 dark:text-violet-400">
        Publicado el
        {dayjs(blog.publishedAt)
          .locale("es")
          .format("DD [de] MMMM [de] YYYY, hh:mm A")}{" "}
      </p>{" "}
      {blog.excerpt && (
        <p className="prose prose-lg md:prose-xl lg:prose-2xl text-lg lg:text-[22px] text-gray-700 dark:text-gray-300 mb-6">
          {blog.excerpt}
        </p>
      )}
      {currentUrl && blog.content && (
        <ShareButtons
          url={currentUrl}
          title={blog.service.title}
          targetId={blog.id}
          type="BLOG"
        />
      )}
      {/* Slider de imágenes */}
      {images.length > 0 && (
        <div className="relative w-full h-80 md:h-96 mb-6 overflow-hidden rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentImage].id}
              src={images[currentImage].url}
              alt={images[currentImage].name || blog.service.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-contain bg-gray-100 dark:bg-gray-800"
            />
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentImage
                    ? "bg-white dark:bg-gray-200"
                    : "bg-white/50 dark:bg-gray-400/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      {blog.description && (
        <p className="prose prose-lg md:prose-xl lg:prose-2xl text-lg lg:text-[22px] text-gray-800 dark:text-gray-200 mb-6">
          {blog.description.split(". ").map((sentence, i) => (
            <span key={i}>{sentence.trim()}. </span>
          ))}
        </p>
      )}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {blog.service.subtitles
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((s) => (
            <span
              key={s.id}
              className="inline-block rounded-xl bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 p-3 text-sm md:text-lg lg:text-xl font-bold tracking-wide"
            >
              {s.text}
            </span>
          ))}
      </div>
      {blog.content && (
        <div className="max-w-7xl mx-auto mb-10 sm:px-6 lg:px-0">
          <div className="prose prose-lg md:prose-xl lg:prose-2xl text-lg lg:text-[22px] text-gray-800 dark:text-gray-200 leading-relaxed space-y-8 bg-white dark:bg-slate-900 p-3 md:p-8 rounded-2xl shadow-md dark:shadow-lg border border-gray-100 dark:border-gray-700">
            {(() => {
              const sentences = blog.content.split(". ").filter(Boolean); // Dividimos por oraciones
              const paragraphs = [];
              for (let i = 0; i < sentences.length; i += 4) {
                // Agrupamos 4 oraciones por párrafo
                paragraphs.push(sentences.slice(i, i + 4).join(". ") + ".");
              }
              return paragraphs.map((para, index) => <p key={index}>{para}</p>);
            })()}
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <BlogReactions blogId={blog.id} userId={userId} />
      </div>
      <div className="mt-2 border-t pt-4 text-right text-sm text-(--color-primary) dark:text-(--color-secondary)" />
        <QuestionList blogId={blog.id} />
      <div className="mt-2 border-t pt-4 text-right text-sm text-(--color-primary) dark:text-(--color-secondary)" />
        <CommentsSection blogId={blog.id} userId={userId} />
    </article>
  );
};

export default BlogCard;
