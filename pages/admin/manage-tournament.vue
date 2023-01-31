<template>
  <Header title-text="Manage Tournament" subtitle-text="SDC 2015" />
  <div class="mx-32">
    <p class="pt-2 pb-1 divide-y-4 font-montserrat font-semibold text-mid-grey">
      Registered Teams
    </p>
    <div class="grid grid-cols-7 gap-4 text-center">
      <div class="col-span-2">
        <Frame
          :title="noviceNum"
          subtitle="NOVICE"
          button-size="small"
          :is-horizontal-buttons="false"
          @button1-clicked="
            () => {
              print('Novice Teams');
            }
          "
          @button2-clicked="
            () => {
              print('Novice Division');
            }
          "
          @button3-clicked="
            () => {
              print('Novice Draw');
            }
          "
        />
      </div>
      <div class="col-span-2">
        <Frame
          :title="juniorNum"
          subtitle="JUNIOR"
          button-size="small"
          :is-horizontal-buttons="false"
          @button1-clicked="
            () => {
              print('Junior Teams');
            }
          "
          @button2-clicked="
            () => {
              print('Junior Division');
            }
          "
          @button3-clicked="
            () => {
              print('Junior Draw');
            }
          "
        />
      </div>
      <div class="col-span-2">
        <Frame
          :title="seniorNum"
          subtitle="SENIOR"
          button-size="small"
          :is-horizontal-buttons="false"
          @button1-clicked="
            () => {
              print('Senior Teams');
            }
          "
          @button2-clicked="
            () => {
              print('Senior Division');
            }
          "
          @button3-clicked="
            () => {
              print('Senior Draw');
            }
          "
        />
      </div>
      <div class="col-span-1 bg-yellow-200 rounded py-6">
        <div class="flex flex-col justify-center items-center">
          <h1
            class="text-4xl pt-10 text-center divide-y-4 font-montserrat font-semibold"
          >
            91
          </h1>
          <p>Total</p>
        </div>
      </div>
    </div>
    <p class="pt-5 pb-1 divide-y-4 font-montserrat font-semibold text-mid-grey">
      Information
    </p>
    <div class="grid grid-cols-8 gap-4 text-center">
      <div class="col-span-3">
        <Frame
          :title="status"
          subtitle="STATUS"
          :button-texts="['Open', 'Run', 'Complete']"
          :button-colors="['bg-light-orange-gold', 'bg-light-green', 'bg-gold']"
          :text-colors="['text-black', 'text-white', 'text-black']"
          button-size="small"
          @button1-clicked="
            () => {
              print('Open Tournament');
            }
          "
          @button2-clicked="
            () => {
              print('Run Tournament');
            }
          "
          @button3-clicked="
            () => {
              print('Complete Tournament');
            }
          "
        />
      </div>
      <div class="col-span-2">
        <Frame
          :title="drawStatus"
          subtitle="DRAW STATUS"
          :button-texts="['Generate Draw']"
          @button1-clicked="
            () => {
              print('Generate Draw');
            }
          "
        />
      </div>
      <div class="col-span-1">
        <Frame
          :title="currentRound + '/' + totalRound"
          subtitle="CURRENT ROUND"
          button-size="medium"
          :button-texts="['Advance']"
          @button1-clicked="
            () => {
              print('Advance');
            }
          "
        />
      </div>
      <div class="col-span-2 bg-slate-200 rounded">
        <Frame
          :title="results"
          subtitle="PREVIOUS ROUND"
          :button-texts="['Release Results']"
          @button1-clicked="
            () => {
              print('Release Results');
            }
          "
        />
      </div>
    </div>
    
    <div class="w-1/2 max-h-96 overflow-scroll mt-5 rounded-lg shadow-lg">
      <table class="w-full rounded-lg">
        <thead class="absolute w-full top-0 left-0 right-0">
          
          <tr class="">
            <th v-for="(object, index) in headers" :key="index" class="sticky top-0 bg-white pt-5 pb-5 divide-y-4 font-montserrat font-semibold text-mid-grey text-left text-lg" >
              {{ object.title }}
            </th>
            <th class="sticky top-0 bg-white text-right p-2">
              <button class="bg-amber-300 p-1 rounded-full">
                <PlusIcon class="w-7 h-7" />
              </button>
            </th>
            
          </tr>
        </thead>
        <tbody class="bg-grey">
          <tr v-for="(row, index) in data" :key="index"
            class="h-10 even:bg-white odd:bg-light-grey/10 hover:bg-light-yellow transition duration-150 ease-in-out font-montserrat overflow">
          <td>{{ row.venue }}</td>
          <td class="text-right p-2 border-black">
            <button class="border-solid border-black">
              <XMarkIcon class="w-4 h-4" />
            </button>
          </td>
          </tr>

        </tbody>
      </table>
    </div>
    </div>
  
</template>

<script setup>
import data from "../../data/venues.json"
import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/solid"
const noviceNum = 10;
const juniorNum = 20;
const seniorNum = 30;

const status = "CLOSED";
const drawStatus = "INCOMPLETE";
const currentRound = 0;
const totalRound = "8";
const results = "UNRELEASED";

const print = (msg) => {
  console.log(msg);
};
</script>
