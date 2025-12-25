const axios = require('axios');

const STRAPI_URL = 'http://46.101.178.174:1337';
const API_TOKEN = 'ffe2eca12673af4f9098bce1b76f928a5df7302f93c96ebd975918cf8da919e335a574c665c14bef702ab830c0d5fec09e1e0b6966c5d5080625a4334c57b0b9058b011c44ca5f42cb894098da8f06e54131177102e2e26a3cb20e74f3187c8ab6ef0ecc52653e52db088b80b5ca509606794f655978a6e515c79ecdab69271';

const locales = ['en', 'he', 'ar'];

// Mock data
const categories = [
  {
    id: '1',
    name: {
      en: 'Sushi Rolls',
      he: 'רולים',
      ar: 'لفائف السوشي',
    },
    slug: 'sushi-rolls',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    description: {
      en: 'Traditional and modern sushi rolls',
      he: 'רולים מסורתיים ומודרניים',
      ar: 'لفائف السوشي التقليدية والحديثة',
    },
  },
  {
    id: '2',
    name: {
      en: 'Sashimi',
      he: 'סשימי',
      ar: 'ساشيمي',
    },
    slug: 'sashimi',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop',
    description: {
      en: 'Fresh raw fish, expertly sliced',
      he: 'דג טרי, חתוך במיומנות',
      ar: 'سمك نيء طازج، مقطع بمهارة',
    },
  },
  {
    id: '3',
    name: {
      en: 'Nigiri',
      he: 'ניגירי',
      ar: 'نيجيري',
    },
    slug: 'nigiri',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811f80d6caf?w=400&h=300&fit=crop',
    description: {
      en: 'Hand-pressed sushi with premium fish',
      he: 'סושי לחוץ ידנית עם דג איכותי',
      ar: 'سوشي مضغوط يدوياً مع سمك ممتاز',
    },
  },
  {
    id: '4',
    name: {
      en: 'Appetizers',
      he: 'מתאבנים',
      ar: 'المقبلات',
    },
    slug: 'appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
    description: {
      en: 'Start your meal right',
      he: 'התחל את הארוחה שלך נכון',
      ar: 'ابدأ وجبتك بشكل صحيح',
    },
  },
  {
    id: '5',
    name: {
      en: 'Soups',
      he: 'מרקים',
      ar: 'الشوربات',
    },
    slug: 'soups',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    description: {
      en: 'Warming and comforting',
      he: 'מחמם ומנחם',
      ar: 'دافئ ومريح',
    },
  },
  {
    id: '6',
    name: {
      en: 'Desserts',
      he: 'קינוחים',
      ar: 'الحلويات',
    },
    slug: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    description: {
      en: 'Sweet endings',
      he: 'סיומים מתוקים',
      ar: 'نهايات حلوة',
    },
  },
];

const meals = [
  {
    id: '1',
    categorySlug: 'sushi-rolls',
    name: {
      en: 'California Roll',
      he: 'רול קליפורניה',
      ar: 'لفيفة كاليفورنيا',
    },
    description: {
      en: 'Crab, avocado, cucumber wrapped in nori and sushi rice',
      he: 'סרטן, אבוקדו, מלפפון עטופים בנורי ואורז סושי',
      ar: 'سلطعون، أفوكادو، خيار ملفوف في نوري وأرز السوشي',
    },
    price: 42,
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    calories: 255,
    tags: [{ en: 'popular', he: 'פופולרי', ar: 'شائع' }],
  },
  {
    id: '2',
    categorySlug: 'sushi-rolls',
    name: {
      en: 'Spicy Tuna Roll',
      he: 'רול טונה חריף',
      ar: 'لفيفة التونة الحارة',
    },
    description: {
      en: 'Fresh tuna mixed with spicy mayo, wrapped with cucumber',
      he: 'טונה טרייה מעורבת עם מיונז חריף, עטופה במלפפון',
      ar: 'تونة طازجة ممزوجة مع المايونيز الحار، ملفوفة بالخيار',
    },
    price: 48,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop',
    calories: 290,
    tags: [{ en: 'spicy', he: 'חריף', ar: 'حار' }],
  },
  {
    id: '3',
    categorySlug: 'sashimi',
    name: {
      en: 'Salmon Sashimi',
      he: 'סשימי סלמון',
      ar: 'ساشيمي السلمون',
    },
    description: {
      en: 'Premium Atlantic salmon, expertly sliced and served fresh',
      he: 'סלמון אטלנטי איכותי, חתוך במיומנות ומוגש טרי',
      ar: 'سلمون أطلسي ممتاز، مقطع بمهارة وطازج',
    },
    price: 58,
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    calories: 180,
    tags: [{ en: 'premium', he: 'פרימיום', ar: 'ممتاز' }],
  },
  {
    id: '4',
    categorySlug: 'sashimi',
    name: {
      en: 'Tuna Sashimi',
      he: 'סשימי טונה',
      ar: 'ساشيمي التونة',
    },
    description: {
      en: 'Premium bluefin tuna, cut to perfection',
      he: 'טונה כחולת סנפיר איכותית, חתוכה לשלמות',
      ar: 'تونة زرقاء الزعنفة ممتازة، مقطعة بإتقان',
    },
    price: 72,
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    calories: 195,
    tags: [{ en: 'premium', he: 'פרימיום', ar: 'ممتاز' }],
  },
  {
    id: '5',
    categorySlug: 'nigiri',
    name: {
      en: 'Salmon Nigiri',
      he: 'ניגירי סלמון',
      ar: 'نيجيري السلمون',
    },
    description: {
      en: 'Hand-pressed sushi rice topped with fresh Atlantic salmon',
      he: 'אורז סושי לחוץ ידנית עם סלמון אטלנטי טרי',
      ar: 'أرز سوشي مضغوط يدوياً مع سلمون أطلسي طازج',
    },
    price: 38,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811f80d6caf?w=400&h=300&fit=crop',
    calories: 125,
    tags: [{ en: 'popular', he: 'פופולרי', ar: 'شائع' }],
  },
  {
    id: '6',
    categorySlug: 'appetizers',
    name: {
      en: 'Edamame',
      he: 'אדממה',
      ar: 'إيدامامي',
    },
    description: {
      en: 'Fresh young soybeans, steamed and lightly salted',
      he: 'פולי סויה צעירים טריים, מאודים ומלוחים קלות',
      ar: 'فول الصويا الطازج، مطبوخ على البخار ومملح قليلاً',
    },
    price: 22,
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
    calories: 95,
    tags: [{ en: 'vegetarian', he: 'צמחוני', ar: 'نباتي' }],
  },
  {
    id: '7',
    categorySlug: 'soups',
    name: {
      en: 'Miso Soup',
      he: 'מרק מיסו',
      ar: 'شوربة الميسو',
    },
    description: {
      en: 'Classic Japanese soup made from fermented soybean paste',
      he: 'מרק יפני קלאסי עשוי מפסטת פולי סויה מותססת',
      ar: 'شوربة يابانية كلاسيكية مصنوعة من معجون فول الصويا المخمر',
    },
    price: 18,
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    calories: 35,
    tags: [{ en: 'vegetarian', he: 'צמחוני', ar: 'نباتי' }],
  },
  {
    id: '8',
    categorySlug: 'desserts',
    name: {
      en: 'Mochi Ice Cream',
      he: 'גלידת מוצ\'י',
      ar: 'آيس كريم موتشي',
    },
    description: {
      en: 'Soft, chewy mochi wrapped around premium ice cream',
      he: 'מוצ\'י רך ולעיס עטוף בגלידה איכותית',
      ar: 'موتشي ناعم ومطاطي ملفوف حول آيس كريم ممتاز',
    },
    price: 28,
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    calories: 95,
    tags: [{ en: 'popular', he: 'פופולרי', ar: 'شائع' }],
  },
];

const ingredients = [
  {
    id: 'ing-1',
    name: {
      en: 'Crab',
      he: 'סרטן',
      ar: 'سلطعون',
    },
    price: 0,
    isDefault: true,
  },
  {
    id: 'ing-2',
    name: {
      en: 'Avocado',
      he: 'אבוקדו',
      ar: 'أفوكادو',
    },
    price: 0,
    isDefault: true,
  },
  {
    id: 'ing-3',
    name: {
      en: 'Cucumber',
      he: 'מלפפון',
      ar: 'خيار',
    },
    price: 0,
    isDefault: true,
  },
  {
    id: 'ing-4',
    name: {
      en: 'Extra Avocado',
      he: 'אבוקדו נוסף',
      ar: 'أفوكادو إضافي',
    },
    price: 5,
    isDefault: false,
  },
  {
    id: 'ing-5',
    name: {
      en: 'Spicy Mayo',
      he: 'מיונז חריף',
      ar: 'مايونيز حار',
    },
    price: 3,
    isDefault: false,
  },
  {
    id: 'ing-6',
    name: {
      en: 'No Cucumber',
      he: 'ללא מלפפון',
      ar: 'بدون خيار',
    },
    price: 0,
    isDefault: false,
  },
];

const banners = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=400&fit=crop',
    title: {
      en: 'Fresh Sushi Daily',
      he: 'סושי טרי יומי',
      ar: 'سوشي طازج يومي',
    },
    subtitle: {
      en: 'Premium ingredients, authentic flavors',
      he: 'מרכיבים איכותיים, טעמים אותנטיים',
      ar: 'مكونات ممتازة، نكهات أصيلة',
    },
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=400&fit=crop',
    title: {
      en: 'New Spring Rolls',
      he: 'רולים חדשים',
      ar: 'لفائف الربيع الجديدة',
    },
    subtitle: {
      en: 'Crispy and delicious',
      he: 'פריכים וטעימים',
      ar: 'مقرمش ولذيذ',
    },
  },
];

// Helper function to create API request
const createRequest = (method, endpoint, data = null, locale = 'en') => {
  const config = {
    method,
    url: `${STRAPI_URL}/api${endpoint}?locale=${locale}`,
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  
  if (data) {
    config.data = { data };
  }
  
  return axios(config);
};

// Helper function to extract localized value from tags array
const extractLocalizedTags = (tags, locale) => {
  if (!tags || !Array.isArray(tags)) return [];
  
  return tags
    .map(tag => {
      if (typeof tag === 'object' && tag[locale]) {
        return tag[locale];
      } else if (typeof tag === 'string') {
        return tag;
      }
      return null;
    })
    .filter(tag => tag !== null);
};

// Helper function to create separate entries for each locale
const createEntryWithI18n = async (endpoint, item, fields) => {
  const results = [];
  
  // Create separate entry for each locale
  for (const locale of locales) {
    try {
      const localeData = {};
      fields.forEach(field => {
        // Handle tags specially - extract locale-specific tag values
        if (field === 'tags') {
          localeData[field] = extractLocalizedTags(item[field], locale);
        }
        // Handle localized fields (objects with locale keys)
        else if (item[field] && typeof item[field] === 'object' && item[field][locale] !== undefined) {
          localeData[field] = item[field][locale];
        }
        // Handle non-localized fields (primitives)
        else if (item[field] !== undefined && typeof item[field] !== 'object') {
          // Keep non-localized fields the same for all locales
          localeData[field] = item[field];
        }
      });

      const response = await createRequest('POST', endpoint, localeData, locale);
      const entryId = response.data.data.id;
      const entryName = localeData.name || localeData.title || localeData.slug || `ID: ${entryId}`;
      console.log(`✓ Created ${endpoint} entry (${locale}): ${entryName}`);
      if (localeData.description) {
        console.log(`  Description: ${localeData.description.substring(0, 50)}...`);
      }
      results.push({ locale, id: entryId });
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        const errorMsg = errorData?.error?.message || JSON.stringify(errorData) || error.message;
        
        if (status === 400) {
          if (errorMsg.includes('already exists') || errorMsg.includes('unique')) {
            const entryName = (item.name && item.name[locale]) || (item.title && item.title[locale]) || item.slug || 'Unknown';
            console.log(`⚠ Entry already exists (${locale}): ${entryName}`);
          } else {
            console.error(`✗ Failed to create entry (${locale}) [${status}]:`, errorMsg);
            console.error(`  URL: ${error.config?.url}`);
            console.error(`  Data:`, JSON.stringify(localeData, null, 2));
          }
        } else if (status === 403) {
          console.error(`✗ Permission denied (${locale}): Check API token permissions`);
        } else if (status === 404) {
          console.error(`✗ Endpoint not found (${locale}): ${error.config?.url}`);
          console.error(`  Make sure content type is registered and server is running`);
        } else if (status === 405) {
          console.error(`✗ Method not allowed (${locale}): ${error.config?.url}`);
          console.error(`  This usually means the content type doesn't exist or isn't properly registered`);
          console.error(`  Try rebuilding Strapi: npm run build`);
        } else {
          console.error(`✗ Failed to create entry (${locale}) [${status}]:`, errorMsg);
        }
      } else {
        console.error(`✗ Network error (${locale}):`, error.message);
      }
    }
  }
  
  return results;
};

// Populate categories
const populateCategories = async () => {
  console.log('\n📁 Populating Categories...');
  console.log(`   Creating ${categories.length} categories × 3 locales = ${categories.length * 3} entries`);
  for (const category of categories) {
    await createEntryWithI18n('/categories', category, ['name', 'slug', 'description', 'imageUrl']);
  }
  console.log(`✅ Categories populated: ${categories.length * 3} entries created`);
};

// Populate meals
const populateMeals = async () => {
  console.log('\n🍽️  Populating Meals...');
  console.log(`   Creating ${meals.length} meals × 3 locales = ${meals.length * 3} entries`);
  for (const meal of meals) {
    await createEntryWithI18n('/meals', meal, ['name', 'description', 'categorySlug', 'price', 'imageUrl', 'calories', 'tags']);
  }
  console.log(`✅ Meals populated: ${meals.length * 3} entries created`);
};

// Populate ingredients
const populateIngredients = async () => {
  console.log('\n🥄 Populating Ingredients...');
  console.log(`   Creating ${ingredients.length} ingredients × 3 locales = ${ingredients.length * 3} entries`);
  for (const ingredient of ingredients) {
    await createEntryWithI18n('/ingredients', ingredient, ['name', 'price', 'isDefault']);
  }
  console.log(`✅ Ingredients populated: ${ingredients.length * 3} entries created`);
};

// Populate banners
const populateBanners = async () => {
  console.log('\n🖼️  Populating Banners...');
  console.log(`   Creating ${banners.length} banners × 3 locales = ${banners.length * 3} entries`);
  for (const banner of banners) {
    await createEntryWithI18n('/banners', banner, ['title', 'subtitle', 'imageUrl']);
  }
  console.log(`✅ Banners populated: ${banners.length * 3} entries created`);
};

// Test if server is accessible
const testServer = async () => {
  console.log('\n🔍 Testing Strapi server connection...');
  try {
    const response = await axios.get(`${STRAPI_URL}/api`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });
    console.log('✓ Server is accessible');
    return true;
  } catch (error) {
    console.error('✗ Cannot connect to server:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('  Make sure Strapi server is running');
    }
    return false;
  }
};

// Test if endpoints are accessible
const testEndpoints = async () => {
  console.log('\n🔍 Testing API endpoints...');
  const endpoints = [
    { path: '/categories', name: 'Categories' },
    { path: '/meals', name: 'Meals' },
    { path: '/ingredients', name: 'Ingredients' },
    { path: '/banners', name: 'Banners' },
  ];
  
  const results = {};
  
  for (const endpoint of endpoints) {
    try {
      // Try GET first to see if endpoint exists
      const response = await axios.get(
        `${STRAPI_URL}/api${endpoint.path}?pagination[limit]=1`,
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        }
      );
      console.log(`✓ ${endpoint.name} (${endpoint.path}) - accessible`);
      results[endpoint.path] = true;
    } catch (error) {
      if (error.response?.status === 404) {
        console.error(`✗ ${endpoint.name} (${endpoint.path}) - not found`);
        console.error(`  → Content type may not exist. Create it in Strapi admin panel first.`);
        results[endpoint.path] = false;
      } else if (error.response?.status === 403) {
        console.error(`✗ ${endpoint.name} (${endpoint.path}) - permission denied`);
        console.error(`  → Check API token permissions in Strapi admin panel`);
        results[endpoint.path] = false;
      } else if (error.response?.status === 405) {
        console.error(`✗ ${endpoint.name} (${endpoint.path}) - method not allowed`);
        console.error(`  → Content type may not be registered. Rebuild Strapi: npm run build`);
        results[endpoint.path] = false;
      } else {
        console.error(`✗ ${endpoint.name} (${endpoint.path}) - error: ${error.response?.status || error.message}`);
        results[endpoint.path] = false;
      }
    }
  }
  
  return results;
};

// Main function
const main = async () => {
  console.log('🚀 Starting data population...');
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  
  try {
    // Test server connection first
    const serverAccessible = await testServer();
    if (!serverAccessible) {
      console.error('\n❌ Cannot proceed without server connection');
      process.exit(1);
    }
    
    // Test endpoints
    const endpointResults = await testEndpoints();
    
    // Check if any endpoints are accessible
    const hasAccessibleEndpoints = Object.values(endpointResults).some(v => v === true);
    
    if (!hasAccessibleEndpoints) {
      console.error('\n⚠️  Warning: No accessible endpoints found.');
      console.error('   Make sure content types are created in Strapi admin panel first.');
      console.error('   Or rebuild Strapi server with: npm run build');
      console.log('\n   Continuing anyway...\n');
    } else {
      console.log('\n📝 Starting data population...\n');
    }
    
    await populateCategories();
    await populateMeals();
    await populateIngredients();
    await populateBanners();
    
    console.log('\n✅ Data population completed!');
  } catch (error) {
    console.error('\n❌ Error during population:', error.message);
    process.exit(1);
  }
};

main();tr