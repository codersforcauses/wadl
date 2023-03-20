<template>
  <Header title-text="Scoresheet" />

  <div class="flex justify-evenly mx-8 my-4">
    <p>Division: 1</p>
    <p>Round: 3</p>
    <p>Date: 28 March</p>
    <p>Time: 5:15pm</p>
    <p>Level: Junior</p>
  </div>

  <p class="flex justify-center text-xl font-bold my-4">
    Affirmative Team: Perth College 4
  </p>
  <div class="flex justify-center">
    <table class="w-full max-w-7xl">
      <tr>
        <th>Names</th>
        <th class="w-36">Manner(40)</th>
        <th class="w-36">Matter(40)</th>
        <th class="w-36">Method(20)</th>
        <th class="w-36">POIs</th>
        <th>Total</th>
      </tr>
      <tr class="border-b">
        <td class="text-center">Chantelle</td>
        <td class="px-4"><FormField placeholder="0" type="number" /></td>
        <td class="px-4"><FormField placeholder="0" type="number" /></td>
        <td class="px-4"><FormField placeholder="0" type="number" /></td>

        <td class="px-4"><FormField placeholder="0" type="number" /></td>
        <td class="text-center">75</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>

        <td></td>
        <td class="text-center border-b py-2">75</td>
      </tr>
    </table>
  </div>
</template>
<script setup></script>
