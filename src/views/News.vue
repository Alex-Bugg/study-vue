<template>
  <div>
    <div class="page-title">
      <h3>Новости</h3>
    </div>
    <div class="wrap_header">
      <div class="selecter_country">
        <label>Страна</label>
        <select @change="changeCountry">
          <option value="ua">Украина</option>
          <option value="us">США</option>
          <option value="ru">Россия</option>
        </select>
      </div>
      <div class="wrap_type">
        <label class="label_type">Показывать</label>
        <div class="wrap_radio">
          <label>
            <input
              id="grid"
              class="with-gap"
              name="group1"
              type="radio"
              checked
              @click="changeType"
            />
            <span>Мелкая плитка</span>
          </label>
          <label>
            <input id="list" class="with-gap" name="group1" type="radio" @click="changeType" />
            <span>Крупная плитка</span>
          </label>
        </div>
      </div>
    </div>
    <Loader v-if="loading" />

    <div v-else class="news_block">
      <div class="news_block_wrap" v-for="(n, i) in items" :key="i">
        <a :href="n.url" target="_blank">
          <h4 class="news_block_title">{{n.title}}</h4>
        </a>
        <p class="news_block_from">From: {{n.source.name}}</p>
        <div class="news_block_img_wrap">
          <a :href="n.url" target="_blank">
            <p class="news_block_content">{{n.description}}</p>
            <img class="news_block_img" :src="n.urlToImage" />
          </a>
        </div>
        <div class="news_block_author_wrap">
          <p class="news_block_author">Автор: {{n.author || n.source.name}}</p>
          <p class="news_block_date">{{n.publishedAt | date('date')}}</p>
        </div>
        <div class="news_block_wrap_link">
          <a class="news_block_link" :href="n.url" target="blank">Reed more...</a>
        </div>
      </div>
    </div>
    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="PageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    />
  </div>
</template>

<script>
/* eslint-disable */
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    country: "ua"
  }),
  async mounted() {
    const news = (await this.$store.dispatch("fetchNews", this.country))
      .articles;
    this.setup(news);
    this.loading = false;
  },
  methods: {
    setup(news) {
      this.setupPagination(news);
    },
    async changeCountry(e) {
      this.loading = true;
      this.country = e.target.value;
      this.news = (
        await this.$store.dispatch("fetchNews", this.country)
      ).articles;
      this.loading = false;
    },
    changeType(e) {
      if (e.target.id === "list") {
        document.querySelector(".news_block").classList.add("list");
      } else {
        document.querySelector(".news_block").classList.remove("list");
      }
    }
  }
};
</script>

<style scoped lang="scss">
a {
  color: inherit;
}

select {
  display: block;
  max-width: 300px;
}

.wrap_header {
  display: flex;
  border-bottom: solid 1px rgba(51, 51, 51, 0.12);
  margin-bottom: 2rem;
}

.selecter_country {
  margin-bottom: 15px;
  margin-right: 15px;
}

.label_type {
  display: block;
  margin-bottom: 15px;
}

.wrap_radio {
  min-width: 180px;
  display: flex;
  justify-content: space-between;
}
.news_block {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &_wrap {
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
    max-width: 350px;
    transition: 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover .news_block_content {
      opacity: 1;
    }
  }

  &_title {
    margin-top: 0;
    font-size: 16px;
    transition: 0.2s ease-in;
    min-height: 60px;
    &:hover {
      color: rgb(93, 93, 93);
      text-decoration: dotted underline;
    }
  }

  &_from {
    font-size: 12px;
  }

  &_img {
    width: 100%;
    height: auto;
    min-height: 180px;
  }

  &_img_wrap {
    position: relative;
  }

  &_content {
    position: absolute;
    padding: 10px;
    margin: 0;
    color: rgb(235, 235, 235);
    background-color: rgba(0, 0, 0, 0.315);
    text-shadow: 1px 1px 2px #000;
    height: 100%;
    width: 100%;
    transition: ease-in 0.2s opacity;
    opacity: 0;
  }

  &_author {
    display: block;
    max-width: 50%;
  }

  &_author_wrap {
    display: flex;
    justify-content: space-between;
  }

  &_wrap_link {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &_link {
    border-bottom: 1px solid transparent;
    margin-bottom: 10px;
    &:hover {
      color: rgb(93, 93, 93);
      border-bottom: 1px solid rgb(93, 93, 93);
    }
  }
}

.news_block.list .news_block_wrap {
  max-width: 700px;
}

.news_block.list .news_block_title {
  font-size: 24px;
}

.news_block.list .news_block_img {
  min-height: 420px;
}

.news_block.list .news_block_from,
.news_block.list .news_block_content,
.news_block.list .news_block_author,
.news_block.list .news_block_date,
.news_block.list .news_block_link {
  font-size: 18px;
}
</style>