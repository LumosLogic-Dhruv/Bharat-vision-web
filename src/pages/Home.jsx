import Hero from '../sections/home/Hero'
import Manifesto from '../sections/home/Manifesto'
import InspectionLine from '../sections/home/InspectionLine'
import MachineRail from '../sections/home/MachineRail'
import SpecimenTray from '../sections/home/SpecimenTray'
import Numbers from '../sections/home/Numbers'
import { Solutions, Why } from '../sections/home/Solutions'
import { useTitle } from '../lib/useTitle'

export default function Home() {
  useTitle()
  return (
    <>
      <Hero />
      <Manifesto />
      <InspectionLine />
      <MachineRail />
      <SpecimenTray />
      <Numbers />
      <Solutions />
      <Why />
    </>
  )
}
