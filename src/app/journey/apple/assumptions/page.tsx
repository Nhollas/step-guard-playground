"use client"

import { JourneyFormStep } from "@/components/form-step"
import { USER_DETAILS_STEP } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepRouteSegment={USER_DETAILS_STEP}
      render={() => (
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
          eaque odit deleniti, nesciunt fuga eius, dolorem, reprehenderit
          inventore a reiciendis commodi tenetur repellendus illo quidem
          asperiores optio provident facere error eos. Eum, nesciunt expedita.
          Aperiam inventore doloribus quisquam aliquam, assumenda temporibus vel
          nulla, dicta tenetur illum voluptatibus dolorem sapiente et repellat
          nisi velit est vero officia aut! At nemo suscipit exercitationem qui.
          Eius voluptatem vero quas iure alias dolores laboriosam aspernatur.
          Nisi odit fugiat et ex, commodi est harum obcaecati, quam, iure at
          consequuntur suscipit vel. Eius porro nam corporis omnis beatae
          eligendi soluta voluptates veritatis! Provident natus perspiciatis
          saepe itaque ullam eligendi iure rerum corporis quod ipsum aspernatur
          debitis animi neque explicabo repellat, fugit illo nostrum. Nobis quis
          facilis atque, rem quisquam modi nihil deleniti enim accusamus
          praesentium exercitationem sit eius voluptatum voluptas odit illum
          repudiandae laudantium debitis magni officiis magnam iure porro
          inventore sunt? Minus ex quo saepe pariatur eum ipsa, velit, ab quae
          aut, magnam ipsam distinctio. Deserunt, aspernatur modi natus tenetur
          fugit inventore perferendis obcaecati accusamus, suscipit et mollitia
          sit, ducimus enim distinctio in! Fugiat neque vitae sapiente alias
          nobis iusto veritatis nemo culpa dolor ratione fuga molestiae
          excepturi quod debitis necessitatibus quam, dolorum voluptatem,
          dolores reiciendis. Neque omnis sit tenetur illo unde recusandae
          distinctio perspiciatis accusantium similique placeat! Porro ab nobis
          veniam sit nihil veritatis molestiae minus beatae modi assumenda
          perferendis dolores earum, provident repellendus animi vitae id enim
          voluptate distinctio! Maxime dignissimos porro consectetur minus harum
          id animi impedit saepe suscipit veritatis praesentium inventore
          aliquid fugit reprehenderit, expedita magnam voluptates! Aliquam
          aspernatur aliquid itaque explicabo nemo a repellendus quae omnis
          error voluptatem quam cupiditate asperiores, reiciendis molestias
          quaerat iusto non quas autem, consequatur consectetur id sunt?
          Voluptatem aspernatur itaque ipsa libero, incidunt odit suscipit sequi
          quos quaerat dolores ex unde facilis excepturi delectus dolorum,
          accusantium tempore? Ad enim quos repudiandae totam optio pariatur cum
          numquam tempora quia quibusdam accusantium nisi quo ullam beatae
          veniam cumque nobis aut, laborum natus labore voluptate quasi impedit.
          Debitis qui ea dolores cum unde et molestiae animi doloremque non eius
          dolorem a, reiciendis voluptatum nesciunt tempore? Incidunt, enim vel
          beatae itaque, voluptate expedita ducimus voluptas iusto ipsum facere
          quae. Voluptate provident voluptatibus placeat architecto, ea neque
          iusto eum et nobis expedita deleniti ullam velit cupiditate? Quaerat
          omnis beatae commodi amet reprehenderit accusamus alias incidunt eum,
          atque eveniet possimus! Tempore, a molestias beatae optio porro
          repudiandae, omnis veritatis deserunt id illum repellendus quisquam
          nam saepe temporibus ex sed aspernatur asperiores corporis corrupti?
          Voluptatem, ipsam. Rerum vero aperiam voluptatum. Consectetur pariatur
          porro adipisci aliquam nulla unde qui et in corporis, voluptates
          soluta impedit incidunt ipsum, distinctio reprehenderit id? Dolor
          cupiditate libero accusantium, officiis praesentium sequi neque
          architecto rerum amet in saepe, porro esse, nostrum harum pariatur
          iusto doloremque aliquam! Minus, cum officia. Officia ipsum saepe ab
          id molestias doloribus, dolorum magni, alias accusamus corporis dolor
          deleniti sed numquam laudantium ad quisquam adipisci ipsa impedit
          necessitatibus iure possimus debitis quae? Nihil molestiae, dicta quae
          minima soluta aperiam eligendi quam cumque fugit mollitia illo nobis!
          Placeat minima adipisci, eius in omnis voluptatem tenetur eveniet
          harum repellendus exercitationem earum iste commodi. Totam excepturi
          itaque sequi fuga culpa? Corrupti assumenda dolore aperiam deserunt
          eos nobis a quibusdam placeat itaque consectetur? Repudiandae veniam a
          modi, magnam, error deleniti cumque nulla earum accusantium, quasi
          incidunt dicta? Quis voluptate officiis, molestias commodi voluptatem
          hic assumenda molestiae alias illum, qui neque laudantium enim
          blanditiis, omnis minima exercitationem eius totam! Ad eos fuga non
          quae molestias ex sequi aliquid architecto fugit ab voluptas dolore
          nesciunt labore consequatur tempora ducimus iste eligendi vel minima,
          tenetur vero neque! Repellendus consequatur sed voluptate?
        </h1>
      )}
    />
  )
}
