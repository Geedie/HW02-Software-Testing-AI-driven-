/**
 * fixtures/orders.cjs
 * * Order State Machine (OSM) Test Helper
 * Layers: Primitive (Low-level) -> Seed (Status-specific) -> Orchestration (prepareOrder)
 */

// ==========================================
// PHASE 2: PRIMITIVE LAYER (Tầng thấp nhất)
// ==========================================

/**
 * Thực hiện checkout để tạo mới một order (Trạng thái mặc định ban đầu luôn là PENDING)
 * @param {import('@playwright/test').APIRequestContext} request 
 * @param {string} token - User token
 * @param {object} orderData - { total_amount, shipping_address, items, ... }
 * @returns {Promise<string>} orderId
 */
async function checkout(request, token, orderData) {
  const response = await request.post("/api/checkout", {
    headers: { "Authorization": `Bearer ${token}` },
    data: orderData,
  });

  if (!response.ok()) {
    throw new Error(`[Checkout Failed] Status: ${response.status()} - ${await response.text()}`);
  }

  const body = await response.json();
  // Giả định API trả về { orderId: "..." } hoặc { id: "..." }
  return body.orderId || body.id;
}

/**
 * Lấy thông tin chi tiết của một Order để verify thông tin và trạng thái hiện tại
 * @param {import('@playwright/test').APIRequestContext} request 
 * @param {string} token - User hoặc Admin token
 * @param {string} orderId 
 * @returns {Promise<object>} Toàn bộ object Order { id, status, ... }
 */
async function getOrder(request, token, orderId) {
  const response = await request.get(`/api/orders/${orderId}`, {
    headers: { "Authorization": `Bearer ${token}` },
  });

  if (!response.ok()) {
    throw new Error(`[Get Order Failed] Status: ${response.status()} - ${await response.text()}`);
  }

  return await response.json();
}

/**
 * Hàm duy nhất chịu trách nhiệm cập nhật trạng thái của Order (Dành cho Admin)
 * @param {import('@playwright/test').APIRequestContext} request 
 * @param {string} adminToken 
 * @param {string} orderId 
 * @param {string} status - "confirmed" | "shipping" | "delivered"
 * @returns {Promise<import('@playwright/test').APIResponse>} response
 */
async function transition(request, adminToken, orderId, status) {
  const response = await request.put(`/admin/orders/${orderId}/status`, {
    headers: { "Authorization": `Bearer ${adminToken}` },
    data: { status },
  });

  if (!response.ok()) {
    throw new Error(`[Transition Failed] Cannot move order ${orderId} to "${status}". Status: ${response.status()}`);
  }

  return response;
}


// ==========================================
// PHASE 3: SEED LAYER (Tạo dữ liệu theo State)
// ==========================================

/**
 * Tạo một order ở trạng thái PENDING
 */
async function createPendingOrder(request, tokens, orderData) {
  const orderId = await checkout(request, tokens.userToken, orderData);
  return await getOrder(request, tokens.userToken, orderId);
}

/**
 * Tạo một order ở trạng thái CONFIRMED (Reuse Pending -> Transition)
 */
async function createConfirmedOrder(request, tokens, orderData) {
  const pendingOrder = await createPendingOrder(request, tokens, orderData);
  await transition(request, tokens.adminToken, pendingOrder.id, "confirmed");
  return await getOrder(request, tokens.userToken, pendingOrder.id);
}

/**
 * Tạo một order ở trạng thái SHIPPING (Reuse Confirmed -> Transition)
 */
async function createShippingOrder(request, tokens, orderData) {
  const confirmedOrder = await createConfirmedOrder(request, tokens, orderData);
  await transition(request, tokens.adminToken, confirmedOrder.id, "shipping");
  return await getOrder(request, tokens.userToken, confirmedOrder.id);
}

/**
 * Tạo một order ở trạng thái DELIVERED (Reuse Shipping -> Transition)
 */
async function createDeliveredOrder(request, tokens, orderData) {
  const shippingOrder = await createShippingOrder(request, tokens, orderData);
  await transition(request, tokens.adminToken, shippingOrder.id, "delivered");
  return await getOrder(request, tokens.userToken, shippingOrder.id);
}


// ==========================================
// PHASE 4: ORCHESTRATION LAYER (Giao diện cho Testcase)
// ==========================================

/**
 * Điểm điều hướng duy nhất cho Testcase. Chỉ cần truyền trạng thái mong muốn.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} targetStatus - "pending" | "confirmed" | "shipping" | "delivered"
 * @param {{ userToken: string, adminToken: string }} tokens
 * @param {object} orderData
 */
async function prepareOrder(request, targetStatus, tokens, orderData) {
  const statusMap = {
    pending: createPendingOrder,
    confirmed: createConfirmedOrder,
    shipping: createShippingOrder,
    delivered: createDeliveredOrder,
  };

  const executor = statusMap[targetStatus.toLowerCase()];
  
  if (!executor) {
    throw new Error(`[Prepare Order Error] Trạng thái trạng thái "${targetStatus}" không hợp lệ hặc chưa được hỗ trợ.`);
  }

  return await executor(request, tokens, orderData);
}


// ==========================================
// PHASE 1: SKELETON EXPORT
// ==========================================
module.exports = {
  // Primitive Layer
  checkout,
  transition,
  getOrder,

  // Seed Layer
  createPendingOrder,
  createConfirmedOrder,
  createShippingOrder,
  createDeliveredOrder,

  // Orchestration Layer
  prepareOrder,
};