'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ProductEdit() {
  const params = useParams();
  const { data: session } = useSession();
  const [warehouseList, setWarehouseList] = useState([]);
  const [product, setProduct] = useState('');
  const router = useRouter();

  const [data, setData] = useState({
    name: '',
    brandName: '',
    categoryName: '',
    code: '',
    colorName: '',
    description: '',
    image: '',
    lastPurchaseDate: '',
    lastPurchaseSupplier: '',
    lastSalesCustomer: '',
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
    totalPurchase: parseFloat(0),
    totalSales: parseFloat(0),
    type: 'simple',
    unitName: '',
    warehouseList: '',
  });

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

  useEffect(() => {
    try {
      fetch(`https://localhost:7093/api/Products/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session?.user?.accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProduct(data), setWarehouseList(data.warehouseList);
        });
    } catch (error) {
      console.log('Product-get::Error: ', error);
    }
  }, [session]);

  const handleUpdateProduct = async () => {
    try {
      data.warehouseList = warehouseList;
      const formData = new FormData();
      formData.append('name', data.name ? data.name : product.name);
      formData.append(
        'warehouseList',
        data.warehouseList ? data.warehouseList : product.warehouseList
      );
      formData.append(
        'brandName',
        data.brandName ? data.brandName : product.brandName
      );
      formData.append(
        'categoryName',
        data.categoryName ? data.categoryName : product.categoryName
      );
      formData.append('code', data.code ? data.code : product.code);
      formData.append(
        'colorName',
        data.colorName ? data.colorName : product.colorName
      );
      formData.append(
        'description',
        data.description ? data.description : product.description
      );
      formData.append('image', data.image ? data.image : product.image);
      formData.append('imagePath', product.imagePath);
      formData.append(
        'modelName',
        data.modelName ? data.modelName : product.modelName
      );
      formData.append(
        'variantName',
        data.variantName ? data.variantName : product.variantName
      );
      formData.append(
        'oldPrice',
        data.oldPrice ? data.oldPrice : product.oldPrice
      );
      formData.append(
        'parentCode',
        data.parentCode ? data.parentCode : product.parentCode
      );
      formData.append('price', data.price ? data.price : product.price);
      formData.append(
        'costPrice',
        data.costPrice ? data.costPrice : product.costPrice
      );
      formData.append(
        'productBarcode',
        data.productBarcode ? data.productBarcode : product.productBarcode
      );
      formData.append('status', data.status ? data.status : product.status);
      formData.append('stock', data.stock ? data.stock : product.stock);
      formData.append('type', data.type ? data.type : product.type);
      formData.append(
        'unitName',
        data.unitName ? data.unitName : product.unitName
      );
      const rsp = await axios.post(
        `https://localhost:7093/api/Products/${product.id}`,
        formData,
        {
          'Content-Type':
            'multipart/form-data; boundary=<calculated when request is sent>',
          headers: {
            Authorization: 'Bearer ' + session?.user?.accessToken,
          },
        }
      );
      console.log(rsp);
      if (rsp.status === 200) {
        toast.success('Product updated successfully!');
      }
      router.push('/products');
    } catch (error) {
      console.log('Product-update::Error: ', error);
      toast.error('Product update failed!');
    }
  };

  const categories = [
    { _id: 1, name: 'Mobile-Unofficial' },
    { _id: 2, name: 'Processor' },
    { _id: 3, name: 'Unofficial' },
    { _id: 4, name: 'Intact' },
    { _id: 5, name: 'Pre Owned Android' },
    { _id: 6, name: 'Used' },
  ];

  const brands = [
    { _id: 1, name: 'Samsung' },
    { _id: 2, name: 'Technic' },
    { _id: 3, name: 'Tecno' },
    { _id: 4, name: 'Realme' },
    { _id: 5, name: 'Pecific' },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pb-6">
          <div className="flex justify-center  flex-1 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
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
                          defaultValue={product?.name}
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
                        Status
                      </label>
                      <div className="mt-2">
                        <select
                          name="brandName"
                          defaultValue={product?.status}
                          onChange={(e) =>
                            setData({ ...data, status: e.target.value })
                          }
                          autoComplete="brandName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="trash">Trush</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Brand
                      </label>
                      <div className="mt-2">
                        <select
                          name="brandName"
                          defaultValue={product?.brandName}
                          onChange={(e) =>
                            setData({ ...data, brandName: e.target.value })
                          }
                          autoComplete="brandName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {brands?.map((brand) => (
                            <option key={brand._id} value={brand.name}>
                              {brand.name}
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
                          defaultValue={product?.categoryName}
                          onChange={(e) =>
                            setData({ ...data, categoryName: e.target.value })
                          }
                          autoComplete="categoryName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {categories?.map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
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
                          defaultValue={product?.code}
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
                          defaultValue={product?.colorName}
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
                          defaultValue={product?.description}
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
                          defaultValue={product?.modelName}
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
                          defaultValue={product?.parentCode}
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
                          defaultValue={product?.price}
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
                          defaultValue={product?.costPrice}
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
                          defaultValue={product?.stock}
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
                          defaultValue={product?.productBarcode}
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
                        {warehouseList?.length > 0 &&
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
                          defaultValue={product?.sizeName}
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
                          defaultValue={product?.unitName}
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

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => handleUpdateProduct()}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
