function Validator(options) {
  // hàm validate
  function validate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }
  //    ?Lấy element của form cần validate
  const formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach((rule) => {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );
      if (inputElement) {
        //   Xử lý TH blur ra ngoài
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
        // Xử lý mỗi khi user nhập
        inputElement.oninput = () => {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

// Định nghĩa rule
// Khi không nhập : trả lỗi
// Có nhập : undefined
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Không phải email";
    },
  };
};
Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length > min
        ? undefined
        : `Vui lòng nhập tối thiểu ${min} kí tự`;
    },
  };
};
