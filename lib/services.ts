import { Service } from "@/lib/types";

export const SERVICES: Service[] = [
  {
    id: "body-massage",
    name: "Body Massage",
    description:
      "A full-body massage that relieves tension, improves circulation, and leaves you feeling completely refreshed.",
    duration: "60 min",
    price: "900",
    icon: "HandHeart",
  },
  {
    id: "oil-massage",
    name: "Oil Massage",
    description:
      "A soothing oil massage using warm aromatic oils to deeply nourish your skin and calm your mind.",
    duration: "60 min",
    price: "900",
    icon: "Droplets",
  },
  {
    id: "head-massage",
    name: "Head Massage",
    description:
      "A focused scalp and head massage that relieves headaches, stress, and promotes better sleep.",
    duration: "30 min",
    price: "300",
    icon: "Brain",
  },
  {
    id: "foot-massage",
    name: "Foot Massage",
    description:
      "A relaxing foot and leg massage targeting pressure points to relieve fatigue and improve wellbeing.",
    duration: "30 min",
    price: "200",
    icon: "Footprints",
  },
  {
    id: "relaxation-therapy",
    name: "Relaxation Therapy",
    description:
      "A holistic therapy combining gentle techniques to deeply relax the body, mind, and spirit.",
    duration: "75 min",
    price: "On Request",
    icon: "Smile",
  },
  {
    id: "home-spa",
    name: "Home Spa Service",
    description:
      "A premium at-home spa experience combining multiple treatments for a complete wellness session.",
    duration: "90 min",
    price: "On Request",
    icon: "Sparkles",
  },
];

export const SERVICE_NAMES = SERVICES.map((s) => s.name);
