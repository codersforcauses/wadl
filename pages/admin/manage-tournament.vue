<template>
  <Header title-text="Manage Tournament" subtitle-text="SDC 2015" />
  <div class="mx-32">
    <p class="pt-2 pb-1 divide-y-4 font-montserrat font-semibold text-mid-grey">
      Registered Teams
    </p>
    <div class="grid grid-cols-7 gap-4 text-center">
      <div class="col-span-2 bg-slate-200 rounded">
        <div class="grid grid-cols-2 justify-center">
          <div class="flex flex-col justify-center items-center">
            <h1
              class="text-4xl text-center divide-y-4 font-montserrat font-semibold"
            >
              {{ noviceNum }}
            </h1>
            <p>Novice</p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <Button
              button-text="Teams"
              button-color="bg-gold"
              size="small"
              class="my-2"
            />
            <Button
              button-text="Divisions"
              button-color="bg-light-orange-gold"
              size="small"
              class="my-2"
            />
            <Button
              button-text="Draw"
              button-color="bg-light-green"
              text-color="text-white"
              size="small"
              class="my-2"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 bg-slate-200 rounded">
        <div class="grid grid-cols-2 justify-center">
          <div class="flex flex-col justify-center items-center">
            <h1
              class="text-4xl text-center divide-y-4 font-montserrat font-semibold"
            >
              {{ juniorNum }}
            </h1>
            <p>Junior</p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <Button
              button-text="Teams"
              button-color="bg-gold"
              size="small"
              class="my-2"
            />
            <Button
              button-text="Divisions"
              button-color="bg-light-orange-gold"
              size="small"
              class="my-2"
            />
            <Button
              button-text="Draw"
              button-color="bg-light-green"
              text-color="text-white"
              size="small"
              class="my-2"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 bg-slate-200 rounded">
        <div class="grid grid-cols-2 justify-center">
          <div class="flex flex-col justify-center items-center">
            <h1
              class="text-4xl text-center divide-y-4 font-montserrat font-semibold"
            >
              {{ seniorNum }}
            </h1>
            <p>Senior</p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <Button
              button-text="Teams"
              button-color="bg-gold"
              size="small"
              class="my-2"
            />
            <Button
              button-text="Divisions"
              button-color="bg-light-orange-gold"
              size="small"
              class="my-2"
            />
            <Button
              button-text="Draw"
              button-color="bg-light-green"
              text-color="text-white"
              size="small"
              class="my-2"
            />
          </div>
        </div>
      </div>
      <div class="col-span-1 bg-slate-200 rounded">
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
      <div class="col-span-3 bg-slate-200 rounded">
        <div class="flex flex-col justify-center items-center">
          <h1
            class="text-2xl text-center divide-y-4 font-montserrat font-semibold pt-6"
          >
            {{ status }}
          </h1>
          <p>STATUS</p>
          <div class="flex justify-center items-center">
            <Button
              button-text="Open"
              button-color="bg-light-orange-gold"
              size="small"
              class="m-2"
            />
            <Button
              button-text="Run"
              button-color="bg-light-green"
              text-color="text-white"
              size="small"
              class="m-2"
            />
            <Button
              button-text="Complete"
              button-color="bg-gold"
              size="small"
              class="m-2"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <Frame
          :title="drawStatus"
          subtitle="DRAW STATUS"
          button-text="Generate Draw"
          @button-clicked="
            () => {
              console.log('Generate Draw');
            }
          "
        />
      </div>
      <div class="col-span-1">
        <Frame
          :title="currentRound + '/' + totalRound"
          subtitle="CURRENT ROUND"
          button-size="medium"
          button-text="Advance"
          @button-clicked="
            () => {
              console.log('Advance');
            }
          "
        />
      </div>
      <div class="col-span-2 bg-slate-200 rounded">
        <Frame
          :title="results"
          subtitle="PREVIOUS ROUND"
          button-text="Release Results"
          @button-clicked="
            () => {
              console.log('Advance');
            }
          "
        />
      </div>
    </div>
    <div class="mx-32">
      <table class="table-fixed overflow-scroll w-1/2 rounded-lg">
        <thead class="">
          <tr>
            <th v-for="(object, index) in headers" :key="index" class="pt-5 pb-5 divide-y-4 font-montserrat font-semibold text-mid-grey text-left text-lg" >
              {{ object.title }}
            </th>
            <th class="text-right p-2">
              <button class="bg-amber-300 p-1 rounded-full">
                <PlusIcon class="w-7 h-7" />
              </button>
            </th>
            
          </tr>
        </thead>
        <tbody class="bg-grey p-8">
          <tr v-for="(row, index) in data" :key="index"
            class="h-10 even:bg-white odd:bg-light-grey/10 hover:bg-light-yellow transition duration-150 ease-in-out font-montserrat overflow">
          <td>{{ row.venue }}</td>
          <td  class="text-right p-2 border-black">
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
const headers = [
  {
    key: "name",
    title: "Venues",
  },
 
];
</script>
