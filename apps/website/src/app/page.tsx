import {
  Scene1Setup,
  Scene2Chaos,
  Scene3Snap,
  Scene4Create,
  Scene5SendPaid,
  Scene6Close,
} from "@/components/landing/scenes";

export default function LandingPage() {
  return (
    <>
      <Scene1Setup />
      <Scene2Chaos />
      <Scene3Snap />
      <Scene4Create />
      <Scene5SendPaid />
      <Scene6Close />
    </>
  );
}
