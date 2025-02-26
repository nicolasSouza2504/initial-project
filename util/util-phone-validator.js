class UtilPhoneValidator {

    static isValidPhone(phoneNumber) {

        const validDDDs = [
            "11", "12", "13", "14", "15", "16", "17", "18", "19", // SP
            "21", "22", "24", // RJ
            "27", "28", // ES
            "31", "32", "33", "34", "35", "37", "38", // MG
            "41", "42", "43", "44", "45", "46", // PR
            "47", "48", "49", // SC
            "51", "53", "54", "55", // RS
            "61", // DF
            "62", "64", // GO
            "63", // TO
            "65", "66", // MT
            "67", // MS
            "68", // AC
            "69", // RO
            "71", "73", "74", "75", "77", // BA
            "79", // SE
            "81", "87", // PE
            "82", // AL
            "83", // PB
            "84", // RN
            "85", "88", // CE
            "86", "89", // PI
            "91", "93", "94", // PA
            "95", // RR
            "96", // AP
            "97", "92", // AM
            "98", "99" // MA
        ];

        if (phoneNumber) {

            phoneNumber = phoneNumber.replaceAll(/\D/g, "");

            if (phoneNumber.length > 11) {
                phoneNumber = phoneNumber.substring(0, 11);
            }

            let ddd = phoneNumber.substring(0, 2);

            if (phoneNumber.length >= 2 && !validDDDs.includes(ddd)) {
                return false
            } else if (phoneNumber.length >= 3 && phoneNumber[2] !== "9") {
                return false;
            } else if (phoneNumber.length <= 10) {
                return false;
            }

        } else {
            return false;
        }

        return true;

    }

}
