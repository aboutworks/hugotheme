# 如何使用主题

配置根目录下的hugo.toml文件，将主题指向themes文件夹的hugotheme

# 如何创建文章

根据你需要发布的文件类型在对应的文章里去创建对应的文章，这将会在根目录的content文件夹下去生成对应语言的文章。

例如
```bash
hugo new zh/posts/中文名称/index.md
hugo new en/posts/englishtitle/index.md
```

# 关于多国语言

由于是多国语言的，因些需要在根目录下去指定对应语言的路径

例如
```toml
[languages]
  [languages.zh]
    weight = 1
    languageName = "简体中文"
    contentDir = "content/zh"
    [languages.zh.params]
      shortname = "zh"

  [languages.en]
    weight = 2
    languageName = "English"
    contentDir = "content/en"
    [languages.en.params]
      shortname = "en"
```