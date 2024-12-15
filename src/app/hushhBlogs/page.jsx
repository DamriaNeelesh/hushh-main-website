import { allBlogs } from "contentlayer/generated";
import HomeCoverSection from "../_components/blogHome/HomeCoverSection";
import FeaturedPosts from "../_components/blogHome/FeaturedPosts";
import RecentPosts from "../_components/blogHome/RecentPosts";
import ContactForm from "../_components/features/contactForm";

export default function hushhBlogs() {
  
  return (
    <>
    <main className="flex flex-col mb-10 items-center justify-center">
      <HomeCoverSection blogs={allBlogs} />
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs} />
    </main>
    <ContactForm/>
    </>
  )
}
