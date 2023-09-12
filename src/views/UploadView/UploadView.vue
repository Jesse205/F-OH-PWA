<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import { useTitle } from '@/events/title';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
useTitle(computed(() => t('upload.app')))

</script>

<template>
  <v-app-bar flat border="b">
    <v-btn icon="mdi-arrow-left" @click.stop="$router.back" />
    <v-app-bar-title>{{ $t('upload.app') }}</v-app-bar-title>
  </v-app-bar>
  <app-main>
    <v-container>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nobis dolorum atque rem porro mollitia, deserunt
      culpa
      quis voluptatum vitae, aliquam pariatur dolorem corporis error omnis ipsum facilis nisi! Possimus, numquam
      deleniti
      voluptatum dolor neque repellat, aperiam ducimus voluptates autem et sit porro hic deserunt commodi illum
      consequuntur dolorem assumenda ratione saepe facere voluptatem illo odio soluta? Rerum, soluta dolores nam numquam
      et quia reiciendis possimus nobis dolorum nulla suscipit iure hic consectetur. Maiores in qui facilis ullam,
      deleniti reiciendis sit obcaecati iste, tempora unde consequatur natus minima aut quis dicta? Officia perferendis
      enim asperiores veniam facilis, ex nulla, cum ipsam eveniet vel ea! Amet beatae odio et. Eaque, animi? Ratione
      odio
      magnam, debitis dolorem, modi autem distinctio quia accusamus tempora quae ipsum consequuntur vitae vel culpa
      maiores dicta error deserunt veritatis sapiente illo expedita sint rem? Consectetur eum sint, rerum tempora culpa
      error dolorem provident id doloribus sit. Debitis ullam fugiat iusto in reprehenderit? Vitae ea veritatis magni
      placeat harum temporibus minus sapiente enim delectus officiis perspiciatis laborum eaque, necessitatibus quos
      fugit
      quaerat illo explicabo ducimus a aut laboriosam commodi eius quas neque. Quas, necessitatibus eius. Dolorum eaque
      ducimus natus recusandae debitis tempora, voluptates animi aut delectus iusto impedit doloribus, iste possimus
      ullam, consequuntur omnis qui et excepturi laborum dignissimos laboriosam exercitationem facere. Consectetur atque
      accusamus incidunt iste repudiandae asperiores nobis porro quos unde quidem, itaque facilis nisi aliquam. Magnam
      nihil reiciendis ab voluptates, iste nemo, laboriosam accusantium ut quia facere quas harum eum temporibus
      quisquam
      autem. At possimus quod facilis ipsa praesentium, odit dolor rem. Eligendi quo, vero a esse ipsa explicabo
      doloremque magni recusandae modi eos facere necessitatibus cumque totam impedit libero in consequuntur nobis id
      commodi nihil deleniti iure. Saepe voluptatem repudiandae, vitae ipsam, illo voluptatibus possimus praesentium et
      ipsum excepturi architecto voluptates provident! Rem laborum fugit sapiente eveniet amet consequuntur fuga vel,
      assumenda dicta nihil, totam omnis inventore natus doloremque voluptatum eum, ducimus consectetur asperiores.
      Consequatur asperiores, dolorum veniam, molestias obcaecati vel molestiae blanditiis iusto illum repellendus
      aliquid
      et! Laboriosam nesciunt necessitatibus doloribus minus at ipsam? Eveniet alias hic accusantium aliquam ad
      inventore
      facere sed possimus veritatis harum, maiores corporis pariatur dolor quas laboriosam tempora sit optio in
      necessitatibus sunt, suscipit, iusto minima deserunt earum? Veniam sapiente nisi nulla ratione similique
      consectetur, sint eius neque vel nam obcaecati nemo officia odit incidunt maiores? Temporibus, quos vel modi ullam
      consectetur impedit. Consequuntur veniam necessitatibus labore ex dicta molestias placeat distinctio, possimus
      facere. Hic iste sit laboriosam atque, corrupti quae molestiae neque doloremque, quo recusandae dicta ab nostrum
      aut
      modi magni delectus repellendus quidem, necessitatibus placeat nobis fugiat iure qui quaerat voluptas. Dignissimos
      aliquid voluptate ex a, delectus magni ducimus eligendi minima omnis voluptatum eos saepe, beatae modi, quam velit
      illum est quod error nostrum consectetur repellat ullam. Laboriosam suscipit voluptatum hic tenetur nemo explicabo
      expedita totam fuga reiciendis reprehenderit? Expedita dolores nostrum laudantium? Odio nesciunt eligendi culpa,
      consequuntur nostrum beatae aut ab nulla at recusandae est itaque perspiciatis cum labore quod tempora
      exercitationem dolorem! Dolor eligendi temporibus repudiandae quisquam omnis voluptatibus, ea vero consectetur
      nisi
      atque voluptate maiores similique eos laudantium odio quas iste architecto enim neque aliquid illo libero animi.
      Ipsum commodi veritatis omnis ut excepturi eaque, eos ipsam ea amet animi neque ullam cupiditate, nam alias enim,
      quasi nisi nihil suscipit porro autem tempora perspiciatis? Optio dolore pariatur, culpa cupiditate eius ut
      consectetur blanditiis laborum error! Dolorem nam officia earum magnam vel saepe minima laborum labore quasi in!
      Eum
      repellat magnam tenetur dolorem labore nobis! Voluptate nulla, tempora, mollitia obcaecati optio fugiat beatae
      ipsa
      ullam repudiandae voluptatem molestiae temporibus doloribus consequatur sint necessitatibus quibusdam esse quos,
      eligendi nesciunt consectetur non porro. Cumque ea, obcaecati dolorem ipsa officiis voluptates omnis alias
      suscipit,
      aliquam fuga, soluta vero sequi qui quaerat eveniet et nostrum modi asperiores esse. Libero, quasi accusantium nam
      quia quis aliquam atque ut cum, quas quo laborum delectus temporibus nulla illum iusto officia ad veritatis dolore
      dignissimos. Quos, minima numquam ad accusantium vel nesciunt reiciendis sequi! Aut repellendus cum recusandae,
      maiores quos quam illo ab quidem nobis fugit vel veritatis praesentium saepe in rem! Fuga quidem culpa tempore
      repudiandae rerum animi, fugit nihil repellendus eum suscipit vitae quos cupiditate modi, minus dolore, impedit
      odio
      illum debitis maxime magnam sint veritatis architecto a harum! Animi maiores ratione incidunt quidem, magnam
      cupiditate dignissimos ipsum natus inventore eum quis doloribus aut. Labore at, excepturi ad eveniet voluptatem
      corporis sunt alias dolore sint voluptatibus iste? Deleniti tempore totam a possimus expedita quibusdam earum
      aliquid in iure maxime sint dignissimos deserunt reiciendis quod, dolore quidem. Fugit quos laudantium amet
      excepturi ipsum neque? Suscipit libero delectus at harum laboriosam vero eius aut quidem, sit quaerat ipsa, a iure
      nobis ducimus cumque dolore atque labore necessitatibus dolorum culpa blanditiis voluptatibus pariatur vel. Nisi
      molestias quia consequatur nesciunt iure exercitationem minus, amet quidem inventore harum perspiciatis facilis
      architecto neque. Nesciunt neque et tempora ipsam itaque, illum rerum temporibus non obcaecati fuga similique quia
      dolorum necessitatibus quo dicta. Tempora assumenda quibusdam harum, quis quas recusandae molestias aliquid
      necessitatibus, quasi, dolorum voluptatibus voluptas dignissimos. Quod dignissimos odit odio corrupti sequi illum
      minima vel pariatur atque earum, accusamus et numquam? Esse dolore dolorum culpa quo quia numquam deleniti
      voluptas
      odit? Nisi error magni quam dignissimos eum ipsam dolorum quo natus, molestiae expedita. At excepturi maiores,
      quas
      ipsa cum animi commodi dignissimos ipsam fuga, nostrum officia nihil, molestias sequi quisquam fugiat impedit
      assumenda tempore ullam in quasi vitae expedita? Odio, atque quas fugit quidem quos aspernatur tenetur omnis alias
      explicabo est! Cum illo dolorem perspiciatis facilis, ad cupiditate corrupti molestias impedit quae aliquid
      pariatur. Rem nulla quos culpa officiis, voluptatibus ipsam atque incidunt quam vero assumenda possimus facere eum
      dolorem ratione corrupti facilis sapiente aut deleniti sequi numquam voluptates commodi explicabo harum fugiat!
      Asperiores officiis, ut expedita repellat aspernatur error veritatis optio nisi molestiae aperiam provident,
      saepe,
      qui soluta laborum doloribus distinctio. Magni accusantium aspernatur tempore optio, quasi eveniet, accusamus aut
      expedita modi velit quisquam rerum? Commodi, voluptatum. A laborum illum assumenda quos dignissimos, voluptas
      veniam.
    </v-container>
  </app-main>
</template>

<style scoped></style>
