<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStandsStore } from '@/stores/stands.js'

const { t } = useI18n()
const standsStore = useStandsStore()
const stands = computed(() => standsStore.stands.filter(s => s.prestataire))
const isLoading = computed(() => standsStore.isLoading)
const errorMessage = computed(() => standsStore.error)

function formatActivities(stand) {
  if (!stand.prestataire?.activites || stand.prestataire.activites.length === 0) {
    return [t('standsPage.noActivity')]
  }
  return stand.prestataire.activites
}

function onImageError(event) {
  const element = event?.target
  if (!element) return
  element.style.display = 'none'
  const placeholder = element.nextElementSibling
  if (placeholder && placeholder.classList.contains('media-placeholder')) {
    placeholder.classList.add('is-visible')
  }
}

onMounted(() => {
  standsStore.fetchStands()
})
</script>

<template>
  <section class="stands-page">
    <header class="hero">
      <div class="hero-overlay">
        <p class="kicker">{{ $t('standsPage.heroBadge') }}</p>
        <h1>{{ $t('standsPage.heroTitle') }}</h1>
        <p>{{ $t('standsPage.heroSubtitle') }}</p>
      </div>
    </header>

    <div class="content">
      <div v-if="isLoading" class="status">
        <p>{{ $t('standsPage.loading') }}</p>
      </div>

      <div v-else-if="errorMessage" class="status status-error">
        <p>{{ errorMessage }}</p>
      </div>

      <div v-else class="stands-grid">
        <article v-for="stand in stands" :key="stand.id" class="stand-card">
          <div class="media">
            <img
              v-if="stand.prestataire.images && stand.prestataire.images.length"
              :src="stand.prestataire.images[0]"
              :alt="stand.prestataire.nom"
              @error="onImageError"
            >
            <div
              class="media-placeholder"
              :class="{ 'is-visible': !stand.prestataire.images || !stand.prestataire.images.length }"
            >
              {{ stand.prestataire.nom }}
            </div>
          </div>

          <div class="card-body">
            <p class="badge">{{ stand.prestataire.categorie }}</p>
            <h2>{{ stand.prestataire.nom }}</h2>
            <p class="desc">{{ stand.prestataire.description }}</p>

            <div class="activities">
              <p class="label">{{ $t('standsPage.activities') }}</p>
              <div class="chips">
                <span v-for="act in formatActivities(stand)" :key="act" class="chip">{{ act }}</span>
              </div>
            </div>

            <div class="contact">
              <p class="label">{{ $t('standsPage.contact') }}</p>
              <p>{{ stand.prestataire.contact?.responsable }} · {{ stand.prestataire.contact?.email }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
:root {
  --grey-darker: 180 1% 35%;
}

.stands-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.hero {
  width: 100%;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 15% 20%, rgba(14, 165, 233, 0.4), transparent 55%),
              radial-gradient(circle at 85% 0%, rgba(236, 72, 153, 0.45), transparent 60%),
              linear-gradient(135deg, #020617, #0f172a);
  color: #fff;
}

.hero-overlay {
  text-align: center;
  max-width: 760px;
  padding: 2rem 3rem;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.hero h1 {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: clamp(2rem, 5vw, 3.3rem);
  margin-bottom: 1rem;
}

.kicker {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 0.6rem;
}

.content {
  width: min(1200px, 95%);
  margin: 2rem auto 4rem;
}

.status {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
}

.status-error {
  color: #b91c1c;
}

.stands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.stand-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.media {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-placeholder {
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: #1e293b;
  color: #fff;
}

.media-placeholder.is-visible {
  display: flex;
}

.card-body {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: #e0e7ff;
  color: #312e81;
  font-size: 0.8rem;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
}

.desc {
  color: #475569;
  min-height: 60px;
}

.infos {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.infos span {
  display: block;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
}

.infos strong {
  font-size: 1rem;
}

.activities .chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
}

.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contact p {
  margin: 0.2rem 0 0;
  color: #0f172a;
}

@media (max-width: 640px) {
  .infos {
    grid-template-columns: 1fr;
  }
}
</style>
