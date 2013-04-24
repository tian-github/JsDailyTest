function kKexecutor() {
	return {

		postDataDom : null,

		load_WS_GETALLINFOS_Data : function() {
			var rtnData = null;

			var postData='<?xml version="1.0"?>'
					+ '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.ucstar.im.third.kmss.landray.com">'
					+ '<soapenv:Header></soapenv:Header>'
					+ '<soapenv:Body>'
					+ '<web:WS_GETALLINFOS soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'
					+ '<ARGUMENT xsi:type="com:WS_TIME" xmlns:com="com.landray.kmss.third.im.ucstar.webservice.UcStarOrgSynchro">'
					+ '<TIMESTAMP xsi:type="xsd:string">2010-10-10 11:11:11</TIMESTAMP>'
					+ '<CURPAGE xsi:type="xsd:string">0</CURPAGE>'
					+ '</ARGUMENT>' + '</web:WS_GETALLINFOS>'
					+ '</soapenv:Body>' + '</soapenv:Envelope>';
				
			rtnData =ERP_parser.parseXml(postData);	

			// 跨域问题
			// $.ajax({
			// url : "data/WS_GETALLINFOS.xml",
			// dataType : "xml",
			// success : function(xmldata) {
			// rtnData = xmldata;
			// },
			// error : function(msg) {
			// alert("error")
			// },
			// async : true
			// });

			return rtnData;
		},
		initView : function(xmldom) {

			var m_info_in = {
				info : {
					caption : "",
					thead : [{
								th : "input",
								width : "35%"
							}, {
								th : "data_type",
								width : "10%"
							}, {
								th : "num",
								width : "15%"
							}, {
								th : "desc",
								width : "10%"
							}, {
								th : "data",
								width : "30%"
							}],
					tbody : []
				}
			}
			var parseJson = ERP_parser.parseDom2Json(xmldom, m_info_in,
					"erp-node");
			var template = $("#erp_query_template").html();
			if (!template) {
				return;
			}
			var in_html = Mustache.render(template, m_info_in);
			$("#inputData").append(in_html);
		},

		initRtnView : function(xmldom) {
			var m_info_in = {
				info : {
					caption : "",
					thead : [{
								th : "input",
								width : "35%"
							}, {
								th : "data_type",
								width : "10%"
							}, {
								th : "num",
								width : "15%"
							}, {
								th : "desc",
								width : "10%"
							}, {
								th : "data",
								width : "30%"
							}],
					tbody : []
				}
			}
			var parseJson = ERP_parser.parseDom2Json(xmldom, m_info_in,
					"erp-node");
			var template = $("#erp_query_template").html();
			if (!template) {
				return;
			}
			var in_html = Mustache.render(template, m_info_in);
			$("#output").append(in_html);

		},
		getPostData : function(postTemplate) {
			var keyElements = $("#inputData")
					.find("input[erpNodeValue='true']");
			$(keyElements).each(function(index, element) {
				var nodeKey = $(element).attr("nodeKey");
				var nodeValue = $(element).val();
				var node = ERP_parser.getTargetNodeByKey(nodeKey, null,
						postTemplate, "erp-node-");
				ERP_parser.setNodeText(node, nodeValue);
			});

			return postTemplate;

		},
		createStandardXHR : function() {
			debugger;
			try {
				return new window.XMLHttpRequest();
			} catch (e) {
			}

			try {
				return new window.ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}

		},
		executeWs : function(postDom, httprequests) {

			httprequests.send(postDom.xml);

		}

	}
}