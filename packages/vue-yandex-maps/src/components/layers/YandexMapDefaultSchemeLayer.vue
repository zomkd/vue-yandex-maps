<script lang="ts">
import type { YMapDefaultSchemeLayer } from '@yandex/ymaps3-types';
import type { PropType, Ref } from 'vue';
import {
  computed, defineComponent, h, inject, onMounted,
} from 'vue';
import { setupMapChildren } from '../../composables/utils';

export default defineComponent({
  name: 'YandexMapDefaultSchemeLayer',
  props: {
    value: {
      type: Object as PropType<YMapDefaultSchemeLayer>,
      default: null,
    },
    modelValue: {
      type: Object as PropType<YMapDefaultSchemeLayer>,
      default: null,
    },
    settings: {
      type: Object as PropType<ConstructorParameters<typeof YMapDefaultSchemeLayer>[0]>,
      default: () => ({}),
    },
  },
  emits: {
    'input'(item: YMapDefaultSchemeLayer): boolean {
      return true;
    },
    'update:modelValue'(item: YMapDefaultSchemeLayer): boolean {
      return true;
    },
    hold(status: boolean) {
      return true;
    },
  },
  setup(props, {
    slots,
    emit,
  }) {
    const hold = inject<Ref<number>>('needsToHold')!;
    hold.value++;
    let mapLayer: YMapDefaultSchemeLayer | undefined;

    onMounted(async () => {
      mapLayer = await setupMapChildren({
        createFunction: () => new ymaps3.YMapDefaultSchemeLayer(props.settings || {}),
        settings: computed(() => props.settings),
        isLayer: true,
      });
      emit('input', mapLayer);
      emit('update:modelValue', mapLayer);
      hold.value--;
    });

    return () => h('div', slots.default?.());
  },
});
</script>
