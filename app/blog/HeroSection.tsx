import MaskedHeading from "@/components/MasktedHeading";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      <MaskedHeading
        text="Share Your Story"
        mediaType="video"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        poster="https://images.unsplash.com/photo-1490750967868-88cb4acaa572?auto=format&fit=crop&q=80&w=2560"
        fillScale={1.25}
        parallax={26}
        reveal="rise"
        trigger="view"
        drift={18}
        brightness={1.2}
        saturation={0}
        grayscale={true}
        duration={1.1}
        stagger={0.09}
        align="center"
        weight={700}
        tracking={-0.03}
        lineHeight={1.06}
        textScale={0.115}
      />
    </div>
  );
};

export default HeroSection;
