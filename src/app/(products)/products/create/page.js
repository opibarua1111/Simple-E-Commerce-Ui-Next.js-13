'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ProductCreate() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      fetch('https://localhost:7093/api/Brands', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session?.user?.accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => setBrands(data));
    } catch (error) {
      console.log('Brand-get::Error: ', error);
    }
    try {
      fetch('https://localhost:7093/api/Categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session?.user?.accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => setCategories(data));
    } catch (error) {
      console.log('Categories-get::Error: ', error);
    }
    setLoading(false);
  }, [loading]);

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target;

      setWarehouseList([...warehouseList, value]);
      event.target.value = '';
    }
  };
  const handleRemoveItem = (index) => {
    setWarehouseList((prevKeywords) =>
      prevKeywords.filter((_, i) => i !== index)
    );
  };
  const [data, setData] = useState({
    name: '',
    brandId: '',
    categoryId: '',
    code: '',
    colorName: '',
    description: '',
    image: '',
    modelName: '',
    variantName: '',
    oldPrice: parseFloat(0),
    parentCode: '',
    price: parseFloat(0),
    costPrice: parseFloat(0),
    productBarcode: '',
    sizeName: '',
    status: 'pending',
    stock: parseFloat(0),
    type: 'simple',
    unitName: '',
    warehouseList: '',
  });

  const handleProduct = async () => {
    data.warehouseList = warehouseList;
    try {
      console.log(data.brandId);
      console.log(data.categoryId);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('brandId', data.brandId);
      formData.append('categoryId', data.categoryId);
      formData.append('code', data.code);
      formData.append('colorName', data.colorName);
      formData.append('description', data.description);
      formData.append('modelName', data.modelName);
      formData.append('variantName', data.variantName);
      formData.append('oldPrice', data.oldPrice);
      formData.append('parentCode', data.parentCode);
      formData.append('price', data.price);
      formData.append('costPrice', data.costPrice);
      formData.append('image', data.image);
      formData.append('productBarcode', data.productBarcode);
      formData.append('sizeName', data.sizeName);
      formData.append('status', data.status);
      formData.append('stock', data.stock);
      formData.append('type', data.type);
      formData.append('unitName', data.unitName);
      formData.append('warehouseList', data.warehouseList);

      const rsp = await axios.post(
        'https://localhost:7093/api/Products',
        formData,
        {
          'Content-Type':
            'multipart/form-data; boundary=<calculated when request is sent>',
          headers: {
            Authorization: 'Bearer ' + session?.user?.accessToken,
          },
        }
      );

      if (rsp.status === 200) {
        toast.success('Product created successfully!');
      }
      router.push('/products');
    } catch (error) {
      console.log('Product-create::Error: ', error);
      toast.error('Product create failed!');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-5xl pb-6">
          <div className="flex justify-center  flex-1 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-500">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Create Product
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                          autoComplete="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <div className="col-span-full">
                        <label
                          htmlFor="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Image
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="file_input"
                          type="file"
                          onChange={(e) =>
                            setData({ ...data, image: e.target.files[0] })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Brand
                      </label>
                      <div className="mt-2">
                        <select
                          name="brandName"
                          value={data.brandId}
                          onChange={(e) =>
                            setData({ ...data, brandId: e.target.value })
                          }
                          autoComplete="brandName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {brands?.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.brandName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Category
                      </label>
                      <div className="mt-2">
                        <select
                          name="categoryName"
                          value={data.categoryId}
                          onChange={(e) =>
                            setData({ ...data, categoryId: e.target.value })
                          }
                          autoComplete="categoryName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="code"
                          value={data.code}
                          onChange={(e) =>
                            setData({ ...data, code: e.target.value })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Color Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="colorName"
                          value={data.colorName}
                          onChange={(e) =>
                            setData({ ...data, colorName: e.target.value })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          rows={4}
                          name="description"
                          value={data.description}
                          onChange={(e) =>
                            setData({ ...data, description: e.target.value })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Model Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="modelName"
                          value={data.modelName}
                          onChange={(e) =>
                            setData({ ...data, modelName: e.target.value })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Parent Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="parentCode"
                          value={data.parentCode}
                          onChange={(e) =>
                            setData({ ...data, parentCode: e.target.value })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Price
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="price"
                          value={data.price}
                          onChange={(e) =>
                            setData({
                              ...data,
                              price: parseFloat(e.target.value),
                            })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Cost Price
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="costPrice"
                          value={data.costPrice}
                          onChange={(e) =>
                            setData({
                              ...data,
                              costPrice: parseFloat(e.target.value),
                            })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Stock
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="stock"
                          value={data.stock}
                          onChange={(e) =>
                            setData({
                              ...data,
                              stock: parseFloat(e.target.value),
                            })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Product Barcode
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="productBarcode"
                          value={data.productBarcode}
                          onChange={(e) =>
                            setData({ ...data, productBarcode: e.target.value })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Warehouse List
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                        {warehouseList.length > 0 &&
                          warehouseList?.map((keyword, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                            >
                              <p>{keyword}</p>
                              <XMarkIcon
                                className="h-4 w-4"
                                onClick={() => handleRemoveItem(index)}
                              />
                            </span>
                          ))}
                        <input
                          type="text"
                          name="warehouseList"
                          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="warehouse"
                          onKeyDown={(e) => handleInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Size Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="sizeName"
                          value={data.sizeName}
                          onChange={(e) =>
                            setData({ ...data, sizeName: e.target.value })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Unit Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="unitName"
                          value={data.unitName}
                          onChange={(e) =>
                            setData({ ...data, unitName: e.target.value })
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-8 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => handleProduct()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
