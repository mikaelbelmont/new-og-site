import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Hero } from "@/components/blocks/hero";
import { Scheduling } from "@/components/blocks/scheduling";
import { ResourceAllocation } from "@/components/blocks/resource-allocation";
import { FineAI } from "@/components/blocks/fine-ai";
import { ChatBI } from "@/components/blocks/chat-bi";
import { Stats } from "@/components/blocks/stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Background className="via-muted to-muted/80">
        <ResourceAllocation />
      </Background>
      <FineAI />
      <ChatBI />
      <Background variant="bottom">
        <Scheduling />
        <FAQ />
      </Background>
    </>
  );
}
