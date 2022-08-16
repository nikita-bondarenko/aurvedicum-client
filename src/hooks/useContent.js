import { ref, watch } from 'vue'
import PaginationBase from '@/components/small/PaginationBase.vue'
import useApi from '@/hooks/useApi'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
import BasePageItem from '@/components/BasePageItem.vue'
import { store } from '@/store/store'
import useEditors from '@/hooks/useEditors'
import { useRoute } from 'vue-router'
import { IMAGE_STORE } from '@/config'

const { fetchWithParams, fetch } = useApi()

const useContentList = (url) => {
  const config = ref({ limit: 8, page: 1 })
  const width = document.body.clientWidth

  if (width <= 1240 && width > 600) config.value.limit = 6
  if (width <= 600) config.value.limit = 4

  const editors = useEditors()
  const data = ref({ pagination: { pages: 1 }, items: [] })
  const getData = () =>
    fetchWithParams('get', url, config.value).then((res) => {
      data.value = res.data

      console.log(res.data)
    })

  getData()
  watch(
    () => config.value,
    () => getData()
  )
  return {
    editors,
    store,
    data,
    config,
    IMAGE_STORE
  }
}

const useContentItem = (route, url) => {
  const data = ref({ body: [{ id: 1, body: [] }] })
  fetch('get', `${url + (route.params.id ? '/' + route.params.id : '')}`).then(res => {
    data.value = res.data
    console.log(data.value)
  })
  return {
    store,
    data,
    IMAGE_STORE
  }
}

const news = {
  components: { PaginationBase, BaseSpinner },
  setup() {
    return useContentList('api/news')
  }
}

const articles = {
  components: { PaginationBase, BaseSpinner },
  setup() {
    return useContentList('api/articles')
  }
}

const newsItem = {
  components: { BaseSpinner, BasePageItem },

  setup() {
    return useContentItem(useRoute(), 'api/news')
  }
}

const articlesItem = {
  components: { BaseSpinner, BasePageItem },

  setup() {
    return useContentItem(useRoute(), 'api/articles')
  }
}

const contacts = {
  components: { BaseSpinner },

  setup() {
    return useContentItem(useRoute(), 'api/contacts')
  }
}

const politic = {
  components: { BaseSpinner, BasePageItem },
  setup() {
    return useContentItem(useRoute(), 'api/additions/y6UUIoAFey')
  }
}

const agreement = {
  components: { BaseSpinner, BasePageItem },
  setup() {
    return useContentItem(useRoute(), 'api/additions/IFzSsu4pWy')
  }
}

const history = {
  components: { BaseSpinner, BasePageItem },
  setup() {
    return useContentItem(useRoute(), 'api/additions/iRBFYXsvtb')
  }
}

export {
  politic,
  agreement,
  history,
  contacts,
  articlesItem,
  articles,
  newsItem,
  news
}
