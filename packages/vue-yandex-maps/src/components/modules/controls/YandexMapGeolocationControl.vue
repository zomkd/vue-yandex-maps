<script lang="ts">
import type { PropType } from 'vue';
import {
  computed, defineComponent, h, onMounted,
} from 'vue';
import type { YMapGeolocationControl } from '@yandex/ymaps3-types/packages/controls';
import { setupMapChildren } from '../../../composables/utils.ts';

export default defineComponent({
  name: 'YandexMapGeolocationControl',
  props: {
    value: {
      type: Object as PropType<YMapGeolocationControl>,
      default: null,
    },
    modelValue: {
      type: Object as PropType<YMapGeolocationControl>,
      default: null,
    },
    settings: {
      type: Object as PropType<ConstructorParameters<typeof YMapGeolocationControl>[0]>,
      default: () => ({}),
    },
  },
  emits: {
    'input'(item: YMapGeolocationControl): boolean {
      return true;
    },
    'update:modelValue'(item: YMapGeolocationControl): boolean {
      return true;
    },
  },
  setup(props, {
    slots,
    emit,
  }) {
    let mapChildren: YMapGeolocationControl | undefined;

    onMounted(async () => {
      mapChildren = await setupMapChildren({
        createFunction: (controls) => new controls.YMapGeolocationControl(props.settings),
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
