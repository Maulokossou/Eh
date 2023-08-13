<!-- <template>
    <DeleteIcon @click="delete"/>
    <p class="first-child">
        {{ element.content.slice(0,200) }}
    </p>
    <p class="second-child">{{ element.date.split('T')[0]}}</p>
</template>
<style scoped>
p {
    font-size: 18px;
}

.first-child {
    line-height: 30px;
    margin-top: 25px;
}

.second-child {
    font-size: 14px;
    font-weight: bold;
}
svg{
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
<script lang="ts" setup>
defineProps(['element'])
import DeleteIcon from './DeleteIcon.vue';
import { useDocumentStore } from '@/stores/documents'
const {deleteDoc}=useDocumentStore()

async function deletee() {
    await deleteDoc('je suis le plus fort et le plus riche du monde.je taime mon amour de coeur,jbhqdsvyjfzydfizetyetziudytqezjdvkhjkvchs.MOn amour pissia je t\'aime',8)
}
</script> -->