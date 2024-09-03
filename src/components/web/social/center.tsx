import { cn } from "@/lib/utils"
import Post from "./post"

type CenterProps = {
  className?: string
}

const Center = ({ className }: CenterProps) => {
  return (
    <div className={cn("flex flex-col max-w-4xl gap-y-7 ", className)}>
      {[1, 2].map((post) => (
        <Post
          id="2"
          title="El mejor pase de mi vida"
          authorName="Juan Magan"
          authorImage=""
          createdAt="22 de agosto de 2024 a las 8:30 pm"
          content="Realmente no eran una clase de gladiador, sino más bien un estatus, un gladiador rudiarius era aquel que había recibido un rudis, una espada de madera que marcaba que este gladiador era un hombre libre. A pesar de haber ganado su libertad a través de su combate en el anfiteatro, lo que distinguía a estos gladiadores era el hecho de que optaban por seguir luchando."
          postImage="https://scontent.fada1-15.fna.fbcdn.net/v/t39.30808-6/456910200_1208918843594938_9052737741103180132_n.jpg?stp=cp6_dst-jpg_p526x296&_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=UlA4hnDhzMAQ7kNvgHF7OJy&_nc_ht=scontent.fada1-15.fna&oh=00_AYBNProfCDg_-hndQiQAsMhAkeTqqTjc0XJphWriRUGBZA&oe=66DD0279"
        />
      ))}
      <h1>el Center</h1>
    </div>
  )
}

export default Center
