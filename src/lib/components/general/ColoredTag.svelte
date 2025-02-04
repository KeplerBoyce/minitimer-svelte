<script lang="ts">
  let {
    color,
    textColor,
    text,
  }: {
    color: string,
    textColor: string,
    text: string,
  } = $props();
</script>

<div class={`${color} ${textColor} h-min rounded-full px-1.5 text-sm font-bold`}>
  {text}
</div>
