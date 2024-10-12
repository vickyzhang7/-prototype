from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# 定义一个函数，将千分位符移除，并将字符串转换为浮点数
def clean_price(price_str):
    return float(price_str.replace(",", ""))

@app.route('/api/price-data', methods=['GET'])
def get_price_data():
    try:
        # 读取 CSV 文件
        df = pd.read_csv('SSE Commercial Sub Historical Data.csv')

        # 清理并处理数据
        df['Price'] = df['Price'].apply(clean_price)  # 处理价格中的逗号
        df['Date'] = pd.to_datetime(df['Date'], format='%m/%d/%Y')  # 将日期转换为正确的格式

        # 只提取 Date 和 Price 列，并转换为 JSON 格式
        data = df[['Date', 'Price']].to_dict(orient='records')

        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # 使用 5001 或其他可用端口


