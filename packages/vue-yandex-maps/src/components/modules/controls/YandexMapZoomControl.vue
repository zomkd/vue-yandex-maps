<script lang="ts">
import type { PropType } from 'vue';
import {
  computed, defineComponent, h, onMounted,
} from 'vue';
import type { YMapZoomControl } from '@yandex/ymaps3-types/packages/controls';
import { setupMapChildren } from '../../../composables/utils.ts';

export default defineComponent({
  name: 'YandexMapZoomControl',
  props: {
    value: {
      type: Object as PropType<YMapZoomControl>,
      default: null,
    },
    modelValue: {
      type: Object as PropType<YMapZoomControl>,
      default: null,
    },
    settings: {
      type: Object as PropType<ConstructorParameters<typeof YMapZoomControl>[0]>,
      default: () => ({}),
    },
  },
  emits: {
    'input'(item: YMapZoomControl): boolean {
      return true;
    },
    'update:modelValue'(item: YMapZoomControl): boolean {
      return true;
    },
  },
  setup(props, {
    slots,
    emit,
  }) {
    let mapChildren: YMapZoomControl | undefined;

    onMounted(async () => {
      mapChildren = await setupMapChildren({
        createFunction: (controls) => new controls.YMapZoomControl(props.settings),
        requiredImport: () => ymaps3.import('@yandex/ymaps3-controls@0.0.1'),
        settings: computed(() => props.settings),
        strictMapRoot: true,
      });
      emit('input', mapChildren);
      emit('update:modelValue', mapChildren);
    });

    return () => h('div', slots.default?.());
  },
});
</script>
