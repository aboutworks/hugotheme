console.log("ssh.js加载完成");

// 获取DOM元素
const sshKeyInput = document.querySelector("#ssh-key");
const validateButton = document.querySelector("#ssh-validate-button");
const idcode = document.getElementById("idcode").textContent;
const protectedContent = document.getElementById("protected-content");
const validator = document.getElementById("validator");
const validForm = document.getElementById("valid-form");
const bookid = idcode; // 如需自定义bookid，请修改此处

const STORAGE_KEY = "ssh_auth_list"; // 统一用这个key保存所有记录

function getAuthList() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function setAuthList(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// 检查本地存储
function checkLocalAuth() {
    const list = getAuthList();
    const record = list.find(item => item.id === idcode);
    if (record && record.status === true) {
        protectedContent.style.display = "block";
        validator.style.display = "none";
        validForm.style.display = "none";
        return true;
    }
    protectedContent.style.display = "none";
    validator.style.display = "block";
    validForm.style.display = "block";
    return false;
}

// 独立fetch验证逻辑
async function verifySSHCode(idcode, inputText) {
    const response = await fetch("https://handle.lehuye.com/portals/verify-payment-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": "keebone"
        },
        body: JSON.stringify({
            code_order: idcode,
            payment_order: inputText
        })
    });
    if (!response.ok) {
        throw new Error(`网络响应异常: ${response.status} ${response.statusText}`);
    }
    return await response.json();
}

// 页面加载时先检查
checkLocalAuth();

// 按钮点击事件
validateButton.addEventListener("click", async () => {
    const inputText = sshKeyInput.value.trim();
    if (!inputText) {
        alert("请输入SSH授权串码");
        sshKeyInput.focus();
        return;
    }

    validateButton.disabled = true;
    validateButton.textContent = "验证中...";

    try {
        const data = await verifySSHCode(idcode, inputText);
        let list = getAuthList();
        const idx = list.findIndex(item => item.id === idcode);

        if (data.success) {
            if (idx > -1) {
                list[idx].status = true;
            } else {
                list.push({ id: idcode, status: true });
            }
            setAuthList(list);
            protectedContent.style.display = "block";
            validator.style.display = "none";
            validForm.style.display = "none";
            alert("验证成功！");
        } else {
            if (idx > -1) {
                list[idx].status = false;
            } else {
                list.push({ id: idcode, status: false });
            }
            setAuthList(list);
            alert("验证失败：私钥不匹配。");
        }
    } catch (error) {
        console.error("请求失败:", error);
        alert(`发生错误：${error.message}`);
    } finally {
        validateButton.disabled = false;
        validateButton.textContent = "验证";
    }
});

// 退出验证按钮事件
document.addEventListener("click", function(e) {
    if (e.target && e.target.id && e.target.id.startsWith("out-validate-button_")) {
        const uuid = e.target.id.split("_")[1];
        let list = getAuthList();
        const idx = list.findIndex(item => item.id === uuid);
        if (idx > -1) {
            list[idx].status = false;
            setAuthList(list);
            alert("已退出验证！");
            // 可选：刷新页面或重新检查授权
            location.reload();
            // 或 checkLocalAuth();
        }
    }
});
