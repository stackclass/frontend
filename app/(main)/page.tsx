import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-24 pt-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold">
          <span>Become a better</span>
          <br />
          <span className="bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent">
            software engineer.
          </span>
        </h1>
        <p className="text-xl font-bold text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Stop following tutorials designed for beginners.
          <br className="hidden md:block" />
          Start working on projects that actually challenge you.
          <br className="hidden md:block" />
          Become a better engineer through deliberate practice.
        </p>
        <div className="relative">
          <Image
            src="/profile.png"
            priority={true}
            quality={80}
            width={1000}
            height={640}
            alt="Profile"
            className="rounded-lg"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <Button size="lg" className="rounded-3xl font-bold" asChild>
            <Link href="/catalog">Pick a challenge</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-3xl font-bold cursor-pointer"
          >
            See the 2m demo
          </Button>
        </div>
      </section>

      <section>
        <h3 className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Enjoyed by developers at the world’s best companies
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            "Google",
            "Microsoft",
            "Amazon",
            "Apple",
            "Netflix",
            "Docker",
            "Cloudflare",
            "Adobe",
            "SalesForce",
            "Coinbase",
            "Vercel",
            "NVIDIA",
            "Substack",
            "Tencent",
            "Grab",
            "Meta",
          ].map((company) => (
            <div
              key={company}
              className="text-2xl font-bold text-gray-700 dark:text-gray-400 opacity-70"
            >
              {company}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-[4fr_5fr] gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">
              Projects that go way
              <br />
              beyond the basics
            </h2>
            <div className="text-gray-600 dark:text-gray-400 space-y-4 mb-8">
              <p>
                Challenge yourself beyond implementing CRUD features. Build
                something that actually stimulates you.
              </p>
              <p>
                Recreate timeless software from scratch. Strengthen your
                fundamentals. Master your languages.
              </p>
              <p>Become a confident developer.</p>
            </div>
            <div className="border rounded-lg p-4 text-gray-600 dark:text-gray-400 text-xs">
              <p className="mb-6 =">
                I&apos;m learning about how Redis works under the hood, system
                calls, socket programming in Python — something I&apos;ve never
                done before
              </p>
              <div className="flex flex-row justify-between items-center">
                <div className="flex space-x-3">
                  <div className="relative">
                    <Image
                      src="/akshata-mohan.jpg"
                      width={38}
                      height={38}
                      alt="Akshata Mohan"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="font-bold">Akshata Mohan</div>
                    <div>Senior Data Scientist at Cloudflare</div>
                  </div>
                </div>
                <div className="aspect-video flex items-center justify-center">
                  <span className="p-1 font-bold">Cloudflare</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/challenge.jpg"
                priority={true}
                width={2800}
                height={2400}
                alt="Challenge"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-8">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/experts.png"
                priority={true}
                width={2800}
                height={2400}
                alt="Experts"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">
              Be in the company of
              <br />
              prolific developers
            </h2>
            <div className="text-gray-600 dark:text-gray-400 space-y-4 mb-8">
              <p>Is there a more idiomatic approach? Or a concise one?</p>
              <p>Study how other engineers approach the same problems.</p>
              <p>Develop a circle of influence you can’t find at work.</p>
            </div>
            <div className="border rounded-lg p-6 text-gray-600 dark:text-gray-400 text-xs">
              <p className="mb-6">
                The Redis challenge was extremely fun. I ended up having to read
                Redis protocol specification doc pretty carefully in its
                entirety! The result felt like lightly-guided independent study,
                if that makes sense. (Which, again, was lots of fun)
              </p>
              <div className="flex flex-row justify-between items-center">
                <div className="flex space-x-3">
                  <div className="relative">
                    <Image
                      src="/charles-guo.png"
                      width={38}
                      height={38}
                      alt="Charles Guo"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="font-bold">Charles Guo</div>
                    <div>Scala Team at Stripe</div>
                  </div>
                </div>
                <div className="aspect-video flex items-center justify-center">
                  <span className="p-1 font-bold">Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-[4fr_5fr] gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">
              Use your favourite
              <br />
              tools to code. No limits.
            </h2>
            <div className="text-gray-600 dark:text-gray-400 space-y-4 mb-8">
              <p>Don&apos;t be limited by web-based editors.</p>
              <p>
                Code in your usual IDE, with your preferred customisations. Push
                code with Git and get instant feedback. Share your work on
                GitHub.
              </p>
              <p>StackClass is designed for pros.</p>
            </div>
            <div className="border rounded-lg p-6 text-gray-600 dark:text-gray-400 text-xs">
              <p className="mb-6">
                There are few sites I like as much that have a step by step
                guide. The real-time feedback is so good, it&apos;s creepy!
              </p>
              <div className="flex flex-row justify-between items-center">
                <div className="flex space-x-3">
                  <div className="relative">
                    <Image
                      src="/ananthalakshmi-sankar.jpg"
                      width={38}
                      height={38}
                      alt="Ananthalakshmi Sankar"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="font-bold">Ananthalakshmi Sankar</div>
                    <div>Automation Engineer at Apple</div>
                  </div>
                </div>
                <div className="aspect-video flex items-center justify-center">
                  <span className="p-1 font-bold">Apple</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/workflow.jpg"
              priority={true}
              width={2800}
              height={2400}
              alt="Workflow"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="text-center px-8 py-12">
        <Button size="lg" className="rounded-3xl font-bold w-xs h-12" asChild>
          <Link href="/catalog">
            Try Now <ArrowRight />
          </Link>
        </Button>
      </section>
    </div>
  );
}
