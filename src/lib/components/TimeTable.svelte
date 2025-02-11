<script lang="ts">
  import { session } from "$lib/state";
  import { msToString, getAdjustedTime, avgOfN, getPbAvgOfNSolves } from "$lib/helpers";

  let sessionPbSingle = $derived(getPbAvgOfNSolves($session.solves, 1));
  let sessionPbAo5 = $derived(getPbAvgOfNSolves($session.solves, 5));
  let sessionPbAo12 = $derived(getPbAvgOfNSolves($session.solves, 12));
</script>

<table class="text-center">
  <thead>
    <tr>
      <th></th>
      <th class="font-bold text-sm">
        Current
      </th>
      <th class="font-bold text-sm">
        Session Best
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="font-bold text-sm">
        Single
      </td>
      <td>
        {$session.solves.length === 0 ? "-" : msToString(getAdjustedTime($session.solves[0]))}
      </td>
      <td>
        {sessionPbSingle ? `${sessionPbSingle.timeStr}` : "-"}
      </td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td class="font-bold text-sm">
        Ao5
      </td>
      <td>
        {$session.solves.length < 5 ? "-" : msToString(avgOfN($session.solves, 0, 5) ?? 0)}
      </td>
      <td>
        {sessionPbAo5 ? `${sessionPbAo5.timeStr}` : "-"}
      </td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td class="font-bold text-sm">
        Ao12
      </td>
      <td>
        {$session.solves.length < 12 ? "-" : msToString(avgOfN($session.solves, 0, 12) ?? 0)}
      </td>
      <td>
        {sessionPbAo12 ? `${sessionPbAo12.timeStr}` : "-"}
      </td>
    </tr>
  </tbody>
</table>
