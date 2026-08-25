import { Bot, FileText, Frame, Globe, ImagePlus, Library } from "lucide-react";

export const features = [
  {
    icon: Globe,
    title: "Live web search",
    description: "Fresh answers with cited sources, not a stale snapshot of the internet.",
  },
  {
    icon: FileText,
    title: "Chat with documents",
    description: "Drop a PDF and ask it anything — every claim links back to a page.",
  },
  {
    icon: ImagePlus,
    title: "Image studio",
    description: "Generate, inpaint, upscale and clean backgrounds in one panel.",
  },
  {
    icon: Frame,
    title: "Infinite canvas",
    description: "Results arrive as cards you can move, connect and reuse later.",
  },
  {
    icon: Bot,
    title: "Agents",
    description: "Hand off a long task and get the finished result, not a chat log.",
  },
  {
    icon: Library,
    title: "Library",
    description: "Every canvas, file and prompt stays searchable from day one.",
  },
];

export const steps = [
  { number: "01", title: "Ask", description: "Type a question, drop a file, or paste a link." },
  { number: "02", title: "Nexus works", description: "It searches, reads and generates in parallel." },
  { number: "03", title: "Arrange", description: "Results land on your canvas as connected cards." },
];

export const faqs = [
  {
    question: "How is this different from a normal AI chat?",
    answer: "Answers are cards on a canvas, not messages in a feed. You keep them, move them, and feed one card into another.",
  },
  {
    question: "Which files can I upload?",
    answer: "PDF, images, CSV and text documents. Everything is indexed automatically so you can search across all of them.",
  },
  {
    question: "Are the answers actually sourced?",
    answer: "Yes. Web answers carry linked sources, and document answers point at the exact page they came from.",
  },
  {
    question: "Does it work on a phone?",
    answer: "The canvas becomes a vertical stack of cards on small screens, so you can read and ask on the go.",
  },
  {
    question: "Can I keep working where I left off?",
    answer: "Every canvas is saved. Open the library, pick a canvas, and the whole workspace comes back as it was.",
  },
];

export const logos = ["Northwind", "Acme Corp", "Globex", "Initech", "Umbrella", "Hooli", "Stark"];

export const footerLinks = {
  Product: ["Web search", "Documents", "Studio", "Canvas", "Agents"],
  Company: ["About", "Blog", "Careers"],
  Resources: ["Docs", "Changelog", "Status"],
  Legal: ["Privacy", "Terms"],
};

export const plans = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    description: "Get started with the basics.",
    features: ["5,000 text requests/month", "300 images/month", "2,000 indexed pages", "3 canvases"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 12,
    yearlyPrice: 9,
    description: "For power users who need more.",
    features: ["Unlimited text requests", "2,000 images/month", "20,000 indexed pages", "Unlimited canvases", "Priority support"],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
];