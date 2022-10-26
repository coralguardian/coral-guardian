<template>
  <div class="text-center mt-3">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
        >
          {{ $t('default.donation.dialog.activation') }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5">
          {{ $t('default.donation.dialog.title') }}
        </v-card-title>

        <v-card-text class="donation-explanation-content">
          <p class="text-center mb-2">{{ $t('default.donation.dialog.chart.description') }}</p>
          <div class="chart-container">
            <Pie :chart-data="chartData" :chart-options="options"/>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              class="black--text"
              @click="dialog = false"
          >
            {{ $t('default.donation.dialog.button') }}
          </v-btn>
        </v-card-actions>
      </v-card>
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
          backgroundColor: ['#e6b295', '#cabaac',
            '#818b83', '#99bbc9', '#66919F', '#28335f'
          ],
          data: [42.5, 18.5, 2.7, 8.7, 14.8, 12.8],
        }]
      }
    }
  },
  computed: {
    options() {
      return {
        aspectRatio: this.windowWidth <= 450 ? 0.5 : 1,
        plugins: {
          legend: {
            align: 'left'
          },
          // Change options for ALL labels of THIS CHART
          datalabels: {
            font: {
              weight: 'bold'
            },
            formatter: function (value) {
              return value + '%';
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.chart-container {
  margin: auto;
  max-width: 400px;
}
</style>