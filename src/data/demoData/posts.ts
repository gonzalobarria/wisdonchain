import { PostProps } from "@/components/abis/types/generalTypes"

import cake from "../../../public/cake.jpg"
import macar from "../../../public/macarrones.jpg"
import flour from "../../../public/flour.jpg"
import fearCamera from "../../../public/fearcamera.jpg"
import follows from "../../../public/follows.jpg"
import isabella from "../../../public/isabella.jpg"

export const postsConsumer: PostProps[] = [
  {
    id: "1",
    title: "Red Velvet Cake Delight: A Slice of History & Yum! 🎂✨",
    content:
      "🎂✨ Who can resist the allure of a Red Velvet cake? This decadent treat isn't just about its eye-catching hue—it's a slice of history with a dash of deliciousness! Originating in the early 20th century, this cake became famous for its vibrant color and velvety texture, thanks to a dash of cocoa and buttermilk. It's said that the red hue became a marketing gimmick during the Great Depression to showcase the cake's rich flavor. Today, Red Velvet is beloved for its perfect blend of sweetness, tang, and that stunning red velvet crumb. So next time you enjoy a slice, you're not just indulging in a dessert; you're savoring a piece of culinary history! 🍰❤️ \n #RedVelvetLove #DessertHistory #CakeGoals",
    authorName: "Gonzalo Barría",
    authorImage: "",
    createdAt: "22 de agosto de 2024 a las 8:30 pm",
    postImage: cake,
  },
  {
    id: "2",
    title: "Macaron Magic: Sweet Facts That’ll Make You Crave More!",
    content: `🍰✨ Macaron Magic! ✨🍰 

Get ready to fall in love with these colorful, bite-sized delights! Here are some fun facts about macarons that’ll make you crave them even more:

🌈 Colorful Charm: Macarons come in every color of the rainbow, and each shade is as vibrant as their flavor!
🇫🇷 French Delight: These delicate treats originated in France, but their history dates back to Italy in the 16th century!
👩‍🍳 Two-Part Perfection: Made from almond flour, egg whites, and sugar, these beauties are baked with a crispy shell and chewy center.
🧁 Filling Frenzy: They’re sandwiched together with a variety of fillings—think ganache, buttercream, or jam! 😋
🎨 Artistic Touch: Decorating macarons can be an art form! Some are even hand-painted for an extra special touch. 🎨
💌 Love in a Bite: Macarons are often given as gifts to show affection—what better way to say "I love you" than with a sweet little cookie? 💕
📆 Macaron Day: Did you know there's a National Macaron Day? Celebrate this sugary wonder on March 20th! 🎉
🍓 Flavors Galore: From classic vanilla to exotic matcha or salted caramel, there’s a flavor for everyone to enjoy! 🌟

Indulge in a little macaron magic and let these sweet bites brighten your day! 🌟🍬 #MacaronLove #SweetFacts #TreatYourself`,
    authorName: "Gonzalo Barría",
    authorImage: "",
    createdAt: "15 de agosto de 2024 a las 18:20 pm",
    postImage: macar,
  },
  {
    id: "3",
    title:
      "Flour Power: Why the Right Flour Makes All the Difference in Your Bread!",
    content: `Choosing the right flour is the secret to baking bread that’s a slice of heaven! 🌾🍞 

Whether you're aiming for a crusty baguette or a soft sandwich loaf, the type of flour you use affects everything from texture to taste. High-quality flour provides the perfect balance of protein and gluten, giving your bread the ideal rise and crumb. So, when you’re reaching for that flour bag, remember: the best flour is the foundation of perfect bread! 🥖

 #BreadBaking #FlourPower #BakingTips`,
    authorName: "Gonzalo Barría",
    authorImage: "",
    createdAt: "11 de julio de 2024 a las 8:30 pm",
    postImage: flour,
  },
]

export const postsExpert: PostProps[] = [
  {
    id: "4",
    title: "",
    content:
      "📸✨ Confidence on camera isn't just about looking good—it's about connecting with your audience! For your online cooking business, showing self-confidence translates into trust and credibility. When you’re confident, your passion shines through, making your recipes and tips more engaging and believable. Plus, a positive, assured presence keeps viewers hooked and eager to follow your culinary journey. So, stand tall, smile wide, and let your confidence cook up success! 🍳👩‍🍳 #ConfidenceOnCamera #CookingWithCharm #OnlineSuccess",
    authorName: "Isabella Garcia",
    authorImage: isabella,
    createdAt: "September 04, 2024 - 8:30 pm",
    postImage: fearCamera,
  },
  {
    id: "5",
    title: "",
    content: `🚀🎯 Ready to boost your follower count? Here’s a quick guide to hitting your first milestones:

First 10k: Focus on creating high-quality, engaging content and interact actively with your audience. Leverage hashtags and collaborate with influencers in your niche. 🤝✨

First 20k: Analyze what’s working and double down on successful content. Run targeted ads and offer exclusive content or promotions to attract new followers. 📈🔍

First 50k: Build a strong community by hosting live sessions, creating shareable content, and engaging in conversations. Expand your reach through cross-promotion and strategic partnerships. 🌟🚀`,
    authorName: "Isabella Garcia",
    authorImage: "https://gateway.lighthouse.storage/ipfs/bafkreid2klvf66t2omdb2f7mwjpiklpuupiw3ooyagygfbfbdlrsyxukhy",
    createdAt: "June 13, 2024 - 15:52 pm",
    postImage: follows,
  },
]
