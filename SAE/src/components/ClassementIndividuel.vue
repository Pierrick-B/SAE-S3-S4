<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ClassementService from '@/services/classement.service.js'

const { t } = useI18n()
const isLoading = ref(true)
const classements = ref([])

function formatMetric(entry) {
  if (entry.score !== undefined) return `${entry.score} pts`
  if (entry.points !== undefined) return `${entry.points} pts`
  if (entry.time_seconds !== undefined) return `${entry.time_seconds}s`
  return '--'
}

function formatUserName(entry) {
  return entry?.user?.name || t('classements.anonymous')
}

function rowClass(place) {
  if (place === 1) return 'rank-row rank-gold'
  if (place === 2) return 'rank-row rank-silver'
  if (place === 3) return 'rank-row rank-bronze'
  return 'rank-row'
}

onMounted(async () => {
  classements.value = await ClassementService.getIndividualClassements()
  isLoading.value = false
})
</script>

<template>
  <section class="classement-page">
    <header class="hero hero-individual">
      <div class="hero-overlay">
        <p class="kicker">{{ $t('classements.heroLabel') }}</p>
        <h1>{{ $t('classements.individualHeroTitle') }}</h1>
        <p>{{ $t('classements.individualHeroSubtitle') }}</p>
      </div>
    </header>

    <div class="content" v-if="!isLoading">
      <article v-for="event in classements" :key="event.nom" class="card">
        <div class="card-header">
          <div>
            <p class="card-kicker">{{ $t('classements.organizers') }}</p>
            <h2>{{ event.nom }}</h2>
            <p class="desc">{{ event.description }}</p>
          </div>
          <div class="meta">
            <div>
              <span class="label">{{ $t('classements.date') }}</span>
              <strong>{{ new Date(event.date).toLocaleDateString() }}</strong>
            </div>
            <div>
              <span class="label">{{ $t('classements.prize') }}</span>
              <strong>{{ event.prize }}</strong>
            </div>
            <div>
              <span class="label">{{ $t('classements.participants') }}</span>
              <strong>{{ event.participants_count }}</strong>
            </div>
          </div>
        </div>

        <ul class="organisateurs">
          <li v-for="stand in event.organisateursDetails" :key="stand?.id">
            <h3>{{ stand?.nom }}</h3>
            <p>{{ stand?.categorie }}</p>
          </li>
        </ul>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>{{ $t('classements.participant') }}</th>
                <th>{{ $t('classements.metric') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in event.classement"
                :key="entry.id_user"
                :class="rowClass(entry.place)"
              >
                <td>
                  <span class="badge">{{ entry.place }}</span>
                </td>
                <td class="participant">
                  <span class="name">{{ formatUserName(entry) }}</span>
                  <span class="email" v-if="entry?.user?.email">{{ entry.user.email }}</span>
                </td>
                <td>
                  <span class="metric">{{ formatMetric(entry) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>

    <div v-else class="loading">
      <p>{{ $t('classements.loading') }}</p>
    </div>
  </section>
</template>

<style scoped>
:root {
  --grey-darker: 180 1% 35%;
}

.classement-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  width: 100%;
  min-height: 45vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  background-size: cover;
  background-position: center;
}

.hero-individual {
  background: radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.7), transparent 60%),
              radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.5), transparent 55%),
              linear-gradient(120deg, #020617, #111827);
}

.hero-overlay {
  backdrop-filter: blur(8px);
  background-color: rgba(0,0,0,0.4);
  padding: 2rem 3rem;
  border-radius: 24px;
  max-width: 720px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
}

.hero h1 {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: clamp(2rem, 5vw, 3.4rem);
  margin-bottom: 1rem;
}

.hero .kicker {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
}

.content {
  width: min(1200px, 95%);
  margin: -4rem auto 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 28px;
  padding: 2.5rem;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
}

.card h2 {
  margin: 0;
  font-size: 2rem;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
}

.card .desc {
  color: #4b5563;
  max-width: 540px;
}

.card-kicker {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.4rem;
}

.meta {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.meta .label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.1em;
}

.organisateurs {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.organisateurs li {
  flex: 1 1 220px;
  background: #f8fafc;
  border-radius: 18px;
  padding: 1.2rem 1.5rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
}

thead th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  padding: 0.85rem 1rem;
  color: #475569;
  background: #eef2ff;
  border-radius: 14px;
}

tbody td {
  padding: 1.1rem 1rem;
  border: none;
}

.rank-row {
  background: white;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  position: relative;
}

.rank-row td:first-child {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}

.rank-row td:last-child {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}

.rank-row::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid transparent;
  pointer-events: none;
}

.rank-gold {
  background: linear-gradient(135deg, #fff7e6, #fde68a);
}

.rank-gold::after {
  border-color: #fcd34d;
}

.rank-silver {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
}

.rank-silver::after {
  border-color: #cbd5f5;
}

.rank-bronze {
  background: linear-gradient(135deg, #fef3c7, #fcd9b6);
}

.rank-bronze::after {
  border-color: #fbbf24;
}

.badge {
  background: hsl(var(--grey-darker) / 0.1);
  color: hsl(var(--grey-darker));
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
}

.participant .name {
  font-weight: 600;
  display: block;
}

.participant .email {
  font-size: 0.85rem;
  color: #64748b;
}

.metric {
  font-weight: 700;
  font-size: 1rem;
  color: #0f172a;
}

.loading {
  margin: 4rem auto;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }

  .meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  thead {
    display: none;
  }

  table, tbody, tr, td {
    display: block;
  }

  tbody tr {
    margin-bottom: 1rem;
    border-radius: 16px;
    padding: 1rem;
  }

  tbody td {
    border: none;
    padding: 0.2rem 0;
  }
}
</style>
