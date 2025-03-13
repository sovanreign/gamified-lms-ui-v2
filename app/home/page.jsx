import Body from "@/components/body";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

const images = [
  { src: "/img1.jpg", title: "Img 1" },
  { src: "/img2.jpg", title: "Img 2" },
  { src: "/img3.jpg", title: "Img 3" },
  { src: "/img4.jpg", title: "Img 4" },
];

export default function Page() {
  return (
    <Body>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 p-4">
          {images.map((image, index) => (
            <Image
              src={image.src}
              alt={image.title}
              width={300}
              height={200}
              className="w-full rounded-xl "
            />
          ))}
        </div>
      </div>
    </Body>
  );
}
