
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Button } from './ui/button'
import { NavigationSidebar } from './navigation/navigation-sidebar'
import ServerSideBar from './server/server-sidebar'
const MobileToggle = ({
    serverId
}:{serverId:string}) => {
  return (
 <Sheet>
    <SheetTrigger>
        <Button variant="primary" size="icon" className='md:hidden'>
        <Menu/>
        </Button>
    </SheetTrigger>
    <SheetContent side={"left"} className='p-0 flex gap-0'>
    <div className='w-[72px]'>
    <NavigationSidebar/>
    </div>
    <ServerSideBar serverId={serverId} />
    </SheetContent>

 </Sheet>
  )
}

export default MobileToggle