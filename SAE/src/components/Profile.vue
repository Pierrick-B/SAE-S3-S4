<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useRoute } from 'vue-router'
import stands from '@/datasource/stands.js'
import { programmation } from '@/datasource/data_programmation.js'

const { t } = useI18n()
const userStore = useUserStore()
const route = useRoute()

const userId = route.params.userId

onMounted(() => {
  userStore.fetchUserProfile(userId)
})

const user = computed(() => userStore.currentUser)

const favoriteStands = computed(() => {
  if (!user.value) return []
  return stands.filter(stand => user.value.favorites.includes(stand.id))
})

const registeredEvents = computed(() => {
  if (!user.value) return []
  return programmation.filter(event => user.value.registeredEvents.includes(event.nom))
})
</script>

<template>
  <div v-if="user" class="profile-container">
    <h1>{{ $t('profile.title') }}</h1>
    <div class="profile-sections">
      <section class="profile-section">
        <h2>{{ $t('profile.info') }}</h2>
        <p><strong>{{ $t('profile.name') }}:</strong> {{ user.name }}</p>
        <p><strong>{{ $t('profile.email') }}:</strong> {{ user.email }}</p>
      </section>
      <section class="profile-section">
        <h2>{{ $t('profile.favorites') }}</h2>
        <ul>
          <li v-for="stand in favoriteStands" :key="stand.id">
            {{ stand.nom }} - {{ stand.description }}
          </li>
        </ul>
      </section>
      <section class="profile-section">
        <h2>{{ $t('profile.registeredEvents') }}</h2>
        <ul>
          <li v-for="event in registeredEvents" :key="event.nom">
            {{ event.nom }} - {{ event.jour }} {{ event.heure_debut }}h - {{ event.heure_fin }}h
          </li>
        </ul>
      </section>
    </div>
  </div>
  <div v-else>
    <p>{{ $t('profile.loading') }}</p>
  </div>
</template>

<style scoped>
</style>
<style scoped>
:root {
  --grey-darker: 180 1% 35%;
}

.profile-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.profile-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.profile-section {
  flex: 1 1 320px;
  max-width: 350px;
  min-width: 260px;
  margin: 0 auto;
  background: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: hsl(var(--grey-darker));
}

h2 {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

p, li {
  font-family: Titillium, Arial, sans-serif;
  font-size: 1.1rem;
  color: #2c3e50;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background: #fff;
  margin-bottom: 0.7rem;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(44, 62, 80, 0.06);
  display: flex;
  flex-direction: column;
}

@media (max-width: 1100px) {
  .profile-container {
    max-width: 98vw;
    padding: 1.5rem 0.5rem;
  }
  .profile-sections {
    gap: 1.2rem;
  }
  .profile-section {
    max-width: 95vw;
    min-width: 220px;
    padding: 1rem 0.7rem;
  }
  h1 {
    font-size: 1.7rem;
  }
  h2 {
    font-size: 1.1rem;
  }
  p, li {
    font-size: 1rem;
  }
}

@media (max-width: 700px) {
  .profile-container {
    padding: 0.5rem 0.2rem;
  }
  .profile-sections {
    flex-direction: column;
    gap: 1rem;
  }
  .profile-section {
    max-width: 100vw;
    min-width: 0;
    padding: 0.7rem 0.3rem;
  }
  h1 {
    font-size: 1.2rem;
  }
  h2 {
    font-size: 1rem;
  }
  p, li {
    font-size: 0.95rem;
  }
}
</style>