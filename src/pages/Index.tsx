import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  timestamp: Date;
}

const Index = () => {
  const [links, setLinks] = useState<Link[]>([
    {
      id: 1,
      url: "https://github.com",
      title: "GitHub",
      description: "Платформа для разработчиков и совместной работы над кодом",
      timestamp: new Date("2024-01-15"),
    },
    {
      id: 2,
      url: "https://dribbble.com",
      title: "Dribbble",
      description: "Сообщество дизайнеров для вдохновения и портфолио",
      timestamp: new Date("2024-01-10"),
    },
  ]);

  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.url && formData.title) {
      const newLink: Link = {
        id: Date.now(),
        ...formData,
        timestamp: new Date(),
      };
      setLinks([newLink, ...links]);
      setFormData({ url: "", title: "", description: "" });
    }
  };

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-semibold text-black mb-2">
            Коллекция ссылок
          </h1>
          <p className="text-gray-600">
            Сохраняйте и организуйте полезные ссылки с описаниями
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Link Form */}
        <Card className="mb-12 border border-gray-200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Ссылка
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    className="border-gray-200 focus:border-black focus:ring-0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Название
                  </label>
                  <Input
                    placeholder="Название сайта или ресурса"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="border-gray-200 focus:border-black focus:ring-0"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Описание
                </label>
                <Textarea
                  placeholder="Краткое описание содержимого или почему эта ссылка полезна..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border-gray-200 focus:border-black focus:ring-0 min-h-[100px]"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full md:w-auto bg-black hover:bg-gray-800 text-white px-8 py-3"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить ссылку
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 border-gray-200 focus:border-black focus:ring-0 h-12"
            />
          </div>
        </div>

        {/* Links Grid */}
        <div className="space-y-4">
          {filteredLinks.length === 0 ? (
            <div className="text-center py-12">
              <Icon
                name="Link"
                size={48}
                className="mx-auto mb-4 text-gray-300"
              />
              <p className="text-gray-500 text-lg">
                {searchQuery
                  ? "Ничего не найдено"
                  : "Пока нет сохраненных ссылок"}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {searchQuery
                  ? "Попробуйте изменить поисковый запрос"
                  : "Добавьте первую ссылку с помощью формы выше"}
              </p>
            </div>
          ) : (
            filteredLinks.map((link) => (
              <Card
                key={link.id}
                className="border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="User" size={20} className="text-gray-400" />
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {link.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {link.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors font-medium"
                        >
                          <Icon name="ExternalLink" size={16} />
                          Перейти
                        </a>
                        <span className="text-sm text-gray-400">
                          {link.timestamp.toLocaleDateString("ru-RU")}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
