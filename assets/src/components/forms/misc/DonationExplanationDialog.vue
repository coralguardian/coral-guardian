<template>
  <div class="mt-6">
    <v-dialog
        v-model="dialog"
        width="650"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            depressed
            class="href-button"
            v-bind="attrs"
            v-on="on"
        >
          <span class="href-button-text">
            {{ $t('default.donation.dialog.activation') }}
          </span>
        </v-btn>
      </template>

      <div
          class="donation-dialog"
      >

        <p class="cg-title">
          {{ $t('default.donation.dialog.title') }}
        </p>

        <p class="cg-base-text mb-2">{{ $t('default.donation.dialog.chart.description') }}</p>
        <div class="chart-container">
          <Pie :chart-data="chartData" :chart-options="options"/>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="action-container">
          <v-btn
              color="primary"
              class="cg-btn"
              @click="dialog = false"
          >
            {{ $t('default.donation.dialog.button') }}
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import {Pie} from 'vue-chartjs/legacy'
import {Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, ArcElement} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import screenMixin from "@/mixins/screenMixin";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, ArcElement, ChartDataLabels)

export default {
  name: "donation-explanation-dialog",
  mixins: [screenMixin],
  components: {
    Pie
  },
  data() {
    return {
      dialog: false,
      chartData: {
        labels: [
          this.$t('default.donation.dialog.chart.labels.program'),
          this.$t('default.donation.dialog.chart.labels.awareness'),
          this.$t('default.donation.dialog.chart.labels.science'),
          this.$t('default.donation.dialog.chart.labels.communication'),
          this.$t('default.donation.dialog.chart.labels.fundraisingCosts'),
          this.$t('default.donation.dialog.chart.labels.managementCosts')
        ],
        datasets: [{
          backgroundColor: ['#00AC8C', '#A7B7DA',
            '#FF9940', '#E1000F', '#1B446B', '#4A3AFF'
          ],
          data: [42.5, 18.5, 2.7, 8.7, 14.8, 12.8],
        }]
      }
    }
  },
  computed: {
    options() {
      return {
        aspectRatio: this.windowWidth <= 650 ? 0.5 : 1,
        plugins: {
          legend: {
            align: 'left'
          },
          // Change options for ALL labels of THIS CHART
          datalabels: {
            font: {
              weight: 'bold'
            },
            formatter: function () {
              return ''
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.donation-dialog {
  background: white;
  width: unset !important;
  padding: 20px;
}

.chart-container {
  margin: auto;
  max-width: 450px;
}

.action-container {
  display: flex;
  justify-content: flex-end;
}

.href-button {
  text-transform: unset;
  color: $primary !important;
  background: white !important;
  font-weight: 400;
  font-size: 16px !important;
  line-height: 24px !important;

  .href-button-text {
    text-decoration: underline;
  }

  i {
    font-size: 18px !important;
    margin-left: 10px;
  }
}
</style>
